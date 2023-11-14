//1.
import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getAllTeams } from '../api/data.js';
import { getAllTeamMembers } from '../api/data.js';

//3. ${user}
//4.${teams}
const teamsTemplate = (user, teams, teamMembersGrouping) => html`
<section id="browse">
<article class="pad-med">
    <h1>Team Browser</h1>
</article>

${user ? html`<article class="layout narrow">
    <div class="pad-small"><a href="#" class="action cta">Create Team</a></div>
</article>`
        : nothing}
${teams.map(
    (team) => html`
<article class="layout">
    <img src="${team.logoUrl}" class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${teamMembersGrouping[team._id]}</span>
        <div><a href="/teams/${team._id}" class="action">See details</a>
    </div>
    </div>
</article>
`
        )}
</section>
`;

//2.
export async function showTeams(ctx) {
//2.2.
    const teams = await getAllTeams();
    const teamMembers = await getAllTeamMembers();

    const teamMembersGrouping = {};
    teamMembers.forEach(({teamId}) => {
        if(teamMembersGrouping[teamId]) { // ако имаме вече съществуващ екип в нашата група, и ако го имаме добави още един към бройката
            teamMembersGrouping[teamId] += 1;
        } else{
            teamMembersGrouping[teamId] = 1; // ако го няма значи има един член и ако намери следващ да добави към крайната бройка 
        }
    });

//2.1
    ctx.render(teamsTemplate(ctx.user, teams, teamMembersGrouping)); // този метод който е свързан със самото рендериране да дойде отвън
}