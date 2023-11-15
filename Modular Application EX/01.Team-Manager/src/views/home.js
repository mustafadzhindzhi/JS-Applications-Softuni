//1.
import { html } from '../../node_modules/lit-html/lit-html.js';

//3. взимаме си хтмл-а и подаваме user
const homeTemplate = (user) =>
    html` <section id="home">
<article class="hero layout">
    <img src="./assets/team.png" class="left-col pad-med">
    <div class="pad-med tm-hero-col">
        <h2>Welcome to Team Manager!</h2>
        <p>Want to organize your peers? Create and manage a team for free.</p>
        <p>Looking for a team to join? Browse our communities and find like-minded people!</p>
        ${user
            ? html`<a href="/teams" class="action cta">Browse Teams</a>`
            : html`<a href="/register" class="action cta">Sign Up Now</a>`}
    </div>
</article>
</section>`;

//2.
export function showHome(ctx) {
    ctx.render(homeTemplate(ctx.user)); // този метод който е свързан със самото рендериране да дойде отвън
}