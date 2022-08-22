import { shallowMount } from '@vue/test-utils'; // vue提供的快速测试的方法
import { expect } from 'chai';

import Button from '@/packages/button/button.vue';
import Icon from '@/packages/icon.vue';

import Carousel from '@/packages/carousel/carousel.vue';
import CarouselItem from '@/packages/carousel/carousel-item.vue';

describe('测试当前Carousel组件', () => {
  it('测试initialIndex传入后是否符合预期1', () => {
    let wrapper = shallowMount(Carousel, {
      attachToDocument: true, // 跑在浏览器上
      stubs: {
        'd-carousel-item': CarouselItem,
        'd-button': Button,
        'd-icon': Icon
      },
      slots: {
        default: `<d-carousel-item>
                <div class="content">1</div>
            </d-carousel-item>
            <d-carousel-item>
                <div class="content">2</div>
            </d-carousel-item>
             <d-carousel-item>
                <div class="content">3</div>
            </d-carousel-item>`
      },
      propsData: {
        initialIndex: 0
      }
    });
    let item = wrapper.findAll('.content');
    expect(item.length).to.eq(3);
    expect(item.at(0).text()).to.eq('1');
  });
});
