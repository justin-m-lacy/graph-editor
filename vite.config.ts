import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import autoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from "vite-plugin-html";

const getApiBase = (url?: string) => {

  if (url == null) {
    return 'localhost';
  }
  const portIndex = url.lastIndexOf(':');
  return portIndex > 0 ? url.substring(0, portIndex) : url;

}

// https://vitejs.dev/config/
export default async function ({ mode, command }) {

  const isProduction = mode === 'production';

  const origins = ["'self'", ""].join(" ");

  const api_base = getApiBase(process.env.VITE_API_BASE);

  const securityPolicies = [
    `default-src ${origins}`,
    `connect-src ${origins} ${api_base}`,
    `img-src ${origins} 'unsafe-inline'`,
    `script-src ${origins} 'unsafe-eval'`,
    `font-src ${origins} unsafe-inline`,
    `style-src ${origins} 'unsafe-inline'`,
  ];

  /**
   * Sample variable exposed to final code.
   */
  const buildVariable = 123;

  return defineConfig({

    build: {
      minify: 'terser',
    },
    base: './',
    resolve: {
      alias: [
        { find: /^@\//, replacement: `${resolve(__dirname, './src')}/` },
        { find: /^assets\//, replacement: `${resolve(__dirname, './assets')}/` },
      ]
    },

    define: {
      /// @note The quotes around the variable value are necessary.
      //"import.meta.env.build_variable": `"${buildVariable}"`
    },

    plugins: [

      createHtmlPlugin({
        inject: {
          data: {
            contentSecurityPolicy: securityPolicies.join("; "),
          },
        },
      }),
      vue(),

      // auto-import listed packages
      autoImport({
        dts: resolve(__dirname, 'src/auto-imports.d.ts'),
        imports: ["vue"]

      }),

    ],

    optimizeDeps: {

      include: [
        "vue",
        "@vueuse/core",

      ]
    },

    preview: {
      port: 5000,
      cors: true,
    },


    server: {
      port: 3001,
      cors: true,
      hmr: process.env.SILENT ? false : {
        host: 'localhost'
      },
      watch: {
        ignored: [
          resolve(__dirname, "src/auto-imports.d.ts"),
          resolve(__dirname, "src/components.d.ts")
        ],
      },
    }

  });
}