<template>
  <div
    class="dm-form-item"
    :class="[
      {
        'is-required': isRequired,
        'is-validating': validateState === 'validating',
        'is-success': validateState === 'success',
        'is-error': validateState === 'error',
      },
    ]"
  >
    <label>{{ label }}</label>
    <div class="dm-form-item__content">
      <slot></slot>
      <slot v-if="validateState === 'error' && showMessage" name="error">
        <div class="dm-item__error">
          {{ validateMessage }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';

import emitter from '@/mixins/emitter';
import { getPropByPath, noop } from '@/utils/util';
import objectAssign from '@/utils/merge';

export default {
  name: 'DmFormItem',

  componentName: 'DmFormItem',

  mixins: [emitter],

  provide() {
    return {
      dmFormItem: this,
    };
  },

  inject: ['dmForm'],

  props: {
    prop: String, // 传入 Form 组件的 model 中的字段
    label: String,
    showMessage: {
      type: Boolean,
      default: true,
    },
    rules: [Object, Array],
    required: {
      type: Boolean,
      default: undefined,
    },
  },
  data() {
    return {
      validateState: '',
      validateMessage: '',
    };
  },
  computed: {
    isRequired() {
      let rules = this._getRules();
      let isRequired = false;

      if (rules && rules.length) {
        rules.every((rule) => {
          if (rule.required) {
            isRequired = true;
            return true;
          }
          return false;
        });
      }
      return isRequired;
    },
    form() {
      let parent = this.$parent;
      let parentName = parent.$options.componentName;
      while (parentName !== 'DmForm') {
        parent = parent.$parent;
        parentName = parent.$options.componentName;
      }
      return parent;
    },
    fieldValue() {
      const model = this.form.model;

      if (!model || !this.prop) {
        return;
      }

      let path = this.prop;
      return getPropByPath(model, path).v;
    },
  },
  mounted() {
    // 需要传入 prop
    if (this.prop) {
      this.dispatch('DmForm', 'dm.form.addField', [this]);

      this._addValidateEvents();
    }
  },
  beforeDestroy() {
    this.dispatch('DmForm', 'dm.form.removeField', [this]);
  },
  methods: {
    clearValidate() {},
    resetField() {},
    /**
     * 合并 form 传过来的 rule 和 本身的 rule
     */
    _getRules() {
      let formRules = this.form.rules;
      const selfRules = this.rules;
      const requiredRule =
        this.required !== undefined ? { required: !!this.required } : [];

      const propObj = getPropByPath(formRules, this.prop || '');

      // formRules = formRules ? propObj.o[this.prop || ''] || propObj.v : [];
      formRules = formRules ? propObj.v : [];

      return [].concat(selfRules || formRules || []).concat(requiredRule);
    },
    /**
     * 监听子级表单组件值的变化
     */
    _addValidateEvents() {
      const rules = this._getRules();

      console.log(111, this.prop + ' rules:', rules);

      if (rules.length) {
        this.$on('dm.form.blur', this._onFieldBlur);
        this.$on('dm.form.change', this._onFieldChange);
      }
    },
    _onFieldBlur() {
      console.log(111, 'form-item blur');

      this.validate('blur');
    },
    _onFieldChange() {
      // console.log(111, 'form-item change');

      this.validate('change');
    },
    // 过滤掉与当前的 trigger 不匹配的 rule
    _getFilteredRules(trigger) {
      const rules = this._getRules();

      return rules
        .filter((rule) => {
          if (!rule.trigger || trigger === '') return true;

          if (Array.isArray(rule.trigger)) {
            return rule.trigger.indexOf(trigger) > -1;
          } else {
            return rule.trigger === trigger;
          }
        })
        .map((rule) => objectAssign({}, rule));
    },
    validate(trigger, callback = noop) {
      const rules = this._getFilteredRules(trigger);
      if ((!rules || rules.length === 0) && this.required === undefined) {
        return true;
      }

      this.validateState = 'validating';

      const validator = new AsyncValidator({
        [this.prop]: rules,
      });

      validator.validate(
        { [this.prop]: this.fieldValue },
        { firstFields: true },
        (errors, invalidFields) => {
          // console.log(111, 'errors: ', errors);
          // console.log(111, 'invalidFields: ', invalidFields);

          this.validateState = !errors ? 'success' : 'error';
          this.validateMessage = errors ? errors[0].message : '';

          callback(this.validateMessage, invalidFields);
        }
      );
    },
  },
};
</script>

<style lang="scss"></style>
