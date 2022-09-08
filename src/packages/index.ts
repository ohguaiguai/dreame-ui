import { VueConstructor } from 'vue';

import Button from './button/button.vue';
import ButtonGroup from './button/button-group.vue';
import Icon from './icon/icon.vue';
import Row from './layout/row.vue';
import Col from './layout/col.vue';
import Input from './input/input.vue';

import Container from './container/container.vue';
import Aside from './container/aside.vue';
import Main from './container/main.vue';
import Header from './container/header.vue';
import Footer from './container/footer.vue';

import Upload from './upload/upload.vue';
import Progress from './upload/progress.vue';

import Carousel from './carousel/carousel.vue';
import CarouselItem from './carousel/carousel-item.vue';

import Form from './form/form.vue';

import infiniteScroll from './infiniteScroll';

const components = [
  Button,
  ButtonGroup,
  Icon,
  Row,
  Col,
  Input,
  Container,
  Aside,
  Main,
  Header,
  Footer,
  Upload,
  Progress,
  Carousel,
  CarouselItem,
  Form,
];

const directives = [infiniteScroll];

const install = (Vue: VueConstructor) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });

  directives.forEach((directive) => {
    // @ts-ignore
    Vue.directive(infiniteScroll.name, infiniteScroll);
  });
};

// 有可能组件会通过script标签引入，<script src="daydreamer-ui"></script>
// 如果是通过<script src="path/vue"></script> 这种方式引入vue，Vue会被挂载到window上
if (typeof window.Vue !== 'undefined') {
  install(window.Vue);
}
export default {
  install,
  ...components,
  infiniteScroll,
};
