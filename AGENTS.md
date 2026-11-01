<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Pages live in `src/routes` as TanStack Router file routes (/, /login, /register, /dashboard, /jobs, /post-job); links to paths without routes (profile, employer pages, footer pages, /jobs/:id) are plain `<a>` so they fall through to the root not-found page, matching the original app's catch-all behavior.
- All page data is hardcoded demo content and Login/Register/Post-job actions only show toasts; there is no backend by design from the source archive — add Lovable Cloud before wiring real auth or data.
