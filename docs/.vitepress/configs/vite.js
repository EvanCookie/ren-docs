import imageMin from 'vite-plugin-imagemin'

export const vite = {
    plugins: [
        // 使用 vite-plugin-imagemin 插件
        imageMin({
            mozjpeg: {
                quality: 75, // JPEG 图像质量
              },
              pngquant: {
                quality: [0.65, 0.80], // PNG 图像质量范围
                speed: 4,
              },
              gifsicle: {
                optimizationLevel: 2, // GIF 图像优化等级
              },
              webp: {
                quality: 75, // WebP 图像质量
              },
              svgo: {
                plugins: [
                  { removeViewBox: false },
                  { cleanupIDs: false }
                ]
              }
        })
    ],
}