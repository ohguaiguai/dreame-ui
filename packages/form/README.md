完成功能:

- [x] input、select 等表单组件 根据配置校验时机触发 form-item 校验

  - element 做法: 只要 value 变化都触发校验, 具体时机的配置在 form-item
  - 如果校验规则是自定义的，即自己写的函数，需要通过定义 form 的 rules 属性来传递校验规则

- [x] input、select 等表单组件 value change 或者 blur 时 dispatch 事件, 触发 form-item 校验
- [ ] form 点击提交后触发各个 form-item 校验
- [x] 异步校验
- [ ] 样式单独引入&样式美化

### 如何实现异步校验?

方法 1

```js
npm i async-validator

```

方法 2
form.vue

```js
validate() {
      let count = 0;
      const validateErrors: IFormValidateError[] = [];

      return new Promise((resolve) => {
        const resolveErrors = (res) => {
          count++;
          if (res?.level === 'error') {
            validateErrors.push(res);
          }
          if (count === this.fields.length) {
            resolve(validateErrors);
          }
        };

        this.fields.forEach((field: IFormItem) => {
          const result = field.validate();
          // 执行 promise
          if (result && 'then' in result) {
            result.then((res) => {
              resolveErrors(res);
            });
          } else {
            resolveErrors(result);
          }
        });
      });
    },
```

formItem.vue

```js
validate(): IFormValidateError | undefined | Promise<IFormValidateError | void> {
      const result = validate(this.value, this.allRules);
      if (result && 'then' in result) {
        this.validateState = '';
        this.validateMessage = '校验中...';
        // 返回一个 promise
        return result
          .then((res) => {
            if (res) {
              this.validateMessage = res.message;
              this.validateState = res.level || 'error';
              this.errorRuleType = res.ruleType;
              return { name: this.label, message: res.message, level: res.level };
            }
          })
          .catch(() => {
            this.validateMessage = '校验失败';
            this.validateState = 'error';
            this.errorRuleType = '';
          });
      } else {
        if (result && 'message' in result) {
          this.validateMessage = result.message;
          this.validateState = result.level || 'error';
          this.errorRuleType = result.ruleType;
          return { name: this.label, message: result.message, level: result.level };
        } else {
          this.validateMessage = '';
          this.validateState = 'success';
          this.errorRuleType = '';
        }
      }
    },
  },
```

validate.ts

```js
if ('validator' in (rule as ICustomRule)) {
      if ((rule as ICustomRule).async) {
        // 返回一个 promise
        return Promise.resolve(customValidate(val, rule as ICustomRule)).then((res) => {
          if (res) {
            return { message: res, ruleType: 'custom', level: rule.level || 'error' };
          }
        });
      } else {
        const message = customValidate(val, rule as ICustomRule) as string;
        if (message) {
          return { message, ruleType: 'custom', level: rule.level || 'error' };
        }
      }
    }
```

业务组件中使用

```js
this.$refs.form.validate().then((errors: IFormValidateError[]) => {
  if (errors.length) {
    return;
  }
});
```
