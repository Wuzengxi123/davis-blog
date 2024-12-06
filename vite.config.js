import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcsspxtoviewport from 'postcss-px-to-viewport'
import { viteMockServe } from 'vite-plugin-mock'  // 引入 mock 插件提供的方法
import legacy from '@vitejs/plugin-legacy';
import autoprefixer from 'autoprefixer'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

export default defineConfig((command) => {
  return {
    plugins: [
      vue(),
      // mock 配置项
      viteMockServe({
        // localEnabled: true, // 是否应用于本地
        // prodEnabled: false, // 是否应用于生产
        localEnabled: command.command === 'serve',  // 开发打包开关
        prodEnabled: command.command !== 'serve', // 生产打包开关
        supportTs: false, // 打开后 可以读取 ts 文件模块 请注意 打开后将无法监视.js 文件
        watchFiles: true, // 监视文件更改 这样更改mock的时候，不需要重新启动编译
        logger: true,  //是否在控制台显示请求日志
        mockPath: "./mock/"   // 注意：此时的 mockPath 地址是真正安装的 mock 文件夹的地址;
      }),
      // 打包兼容浏览器版本
      legacy({
        targets: [
          'last 2 versions',
          'iOS >= 10',
          'Android >= 6',
          'Chrome >= 49',
          'Safari >= 10',
          'Samsung >= 5',
          'OperaMobile >= 46',
          // 其他特定版本或者范围
        ]
      }),
      AutoImport({
        resolvers: [VantResolver()],
      }),
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      postcss: {
        plugins: [
          postcsspxtoviewport({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 750, // UI设计稿的宽度，如果你的设计稿是375就改成375  
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
            landscape: false, // 是否处理横屏情况
          }),
          autoprefixer({
            // 自动添加css3浏览器内核前缀
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8',
              //'last 2 versions', // 所有主流浏览器最近2个版本
            ],
            grid: true,
          }),
        ]
      }
    },
  }
})






