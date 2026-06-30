# 部署到 GitHub Pages

本仓库通过 **GitHub Actions** 自动构建 Hugo 站点并发布到 GitHub Pages。
推送到 `main` 分支即触发部署。

## 一次性设置（只需做一次）

### 1. 开启 Pages 源为 GitHub Actions

仓库 → **Settings → Pages** → **Build and deployment** → **Source** 选 **GitHub Actions**。

### 2. 给 workflow 写权限

仓库 → **Settings → Actions → General** → 滚到底部 **Workflow permissions**：
- 选 **Read and write permissions**
- 保存

> 不开这个权限，部署步骤会因 `pages: write` 权限不足而失败。

## 部署流程

每次 `git push origin main` 后：

1. GitHub 自动运行 `.github/workflows/hugo.yml`
2. 构建（`hugo --gc --minify`，baseURL 由 Actions 自动注入）
3. 发布到 GitHub Pages

访问地址：**https://seabreeze7771.github.io/dacheke/**

在仓库 **Actions** 标签页可查看每次构建/部署日志。

## baseURL 说明

`hugo.toml` 中 `baseURL` 已设为 GitHub Pages 地址 `https://seabreeze7771.github.io/dacheke/`。
GitHub Actions 构建时还会用 `configure-pages` 输出的 `base_url` 再次覆盖 `--baseURL`，确保地址始终正确。
本地预览时 `hugo server` 自动用 `http://localhost:1313/`，不受影响。

## 主题（submodule）

PaperMod 以 git submodule 引入，`.gitmodules` 指向 GitHub 原始仓库。
workflow 中 `actions/checkout` 已设 `submodules: recursive`，会自动拉取，无需额外操作。

---

# 本地使用

> Hugo 已安装到 `%LOCALAPPDATA%\Hugo\bin` 并加入用户 PATH，**新开一个终端**后可直接使用 `hugo` 命令。

| 操作 | 命令 |
| --- | --- |
| 本地预览（含草稿） | `hugo server --buildDrafts` |
| 新建文章 | `hugo new content posts/my-post.md` |
| 构建生产版本 | `hugo --gc --minify` |
| 列出所有文章 | `hugo list all` |

## 写作约定

- 文章放在 `content/posts/` 下，文件头部 front matter 的 `date` 必须是**过去时间**（`buildFuture = false`，未来日期的文章不会显示）。
- `draft: true` 的文章默认不发布，预览时加 `--buildDrafts`。
- 文章最后修改时间会根据 git 自动生成（`enableGitInfo`），所以新文章写完后 `git add` 提交即可。
