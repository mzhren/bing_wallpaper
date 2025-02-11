# bing_wallpaper

下载 Bing 每日壁纸。目标网站是 [必应壁纸 | Bing Wallpaper](https://bing.wdbyte.com/)。

本项目完全由 GitHub Copilot 生成。

## 安装

```bash
npm install
```

## 使用

### 第一步：获取图片数据

#### 按年份获取图片数据

```bash
node fetchWallpapersByYear.js <year>
```

#### 按月份获取图片数据

```bash
node fetchWallpapersByMonth.js <year> <month>
```

### 第二步：下载壁纸文件

```bash
node downloadWallpapers.js -d <folder> | -f <file>
```

可以通过`-d`参数指定文件夹，该文件夹下的所有Json文件中的壁纸链接都会被下载，默认下载 4K 分辨率的壁纸。如：

```bash
node downloadWallpapers.js -d wallpapers/2023
```

也可以通过`-f`参数指定Json文件，该文件中的壁纸链接都会被下载，如：

```bash
node downloadWallpapers.js -f wallpapers/2024/202401.json
```

## 配置

直接个性代码即可。

## 贡献

欢迎提交问题和拉取请求。

## 许可证

此项目使用 MIT 许可证。
