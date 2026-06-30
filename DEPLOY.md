# 部署到 Cloudflare Pages

## 一、推送到 GitHub

先在 GitHub 创建一个空仓库（例如 `dacheke-blog`，**不要**勾选初始化 README），然后：

```bash
git remote add origin https://github.com/<你的用户名>/dacheke-blog.git
git branch -M main
git push -u origin main
```

## 二、在 Cloudflare 创建项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **创建** → **Pages** → **连接到 Git**
2. 授权并选择上面的 GitHub 仓库
3. 构建配置：
   - **框架预设**：Hugo
   - **构建命令**：`hugo --gc --minify`
   - **构建输出目录**：`public`
4. **环境变量**（在「设置 → 环境」里添加）：
   - `HUGO_VERSION` = `0.163.3`
5. **保存并部署**

部署成功后会得到一个 `https://<项目名>.pages.dev` 地址。

## 三、baseURL 说明

`hugo.toml` 中的 `baseURL` 当前为占位值 `https://dacheke-blog.pages.dev/`。

- 若 Cloudflare 项目名不同，或绑定了自定义域名，请把它改成实际地址。
- 也可不修改 `hugo.toml`，而把构建命令改为 `hugo --gc --minify --baseURL $URL`，让每次部署自动使用当前部署地址（`$URL` 是 Cloudflare 注入的内置变量）。

## 四、主题（submodule）

PaperMod 以 git submodule 方式引入，`.gitmodules` 指向 GitHub 原始仓库。
Cloudflare Pages 构建时会自动 `git submodule update --init`，无需额外操作。

本地更新主题（走镜像）：

```bash
cd themes/PaperMod
git pull
cd ../..
git add themes/PaperMod
git commit -m "更新 PaperMod 主题"
```

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
