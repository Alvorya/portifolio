import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        blogHome: resolve(__dirname, 'blog/home.html'),
        desafiosVisao: resolve(__dirname, 'blog/posts/desafios-visao-computacional.html'),
        edgeAi: resolve(__dirname, 'blog/posts/edge-ai-visao-computacional.html'),
        machineLearning: resolve(__dirname, 'blog/posts/machine-learning-visao-computacional.html'),
        oQueE: resolve(__dirname, 'blog/posts/o-que-e-visao-computacional.html'),
        opencvPreproc: resolve(__dirname, 'blog/posts/opencv-preprocessamento.html'),
        reconhecimento: resolve(__dirname, 'blog/posts/reconhecimento-facial.html'),
        segmentacao: resolve(__dirname, 'blog/posts/segmentacao-vs-deteccao.html'),
        treinarYolo: resolve(__dirname, 'blog/posts/treinar-modelo-yolo.html'),
        visaoAgricultura: resolve(__dirname, 'blog/posts/visao-computacional-agricultura.html'),
        visaoVarejo: resolve(__dirname, 'blog/posts/visao-computacional-varejo.html'),
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  }
})