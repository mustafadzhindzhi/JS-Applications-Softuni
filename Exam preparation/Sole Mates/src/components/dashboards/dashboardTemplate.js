import { html } from "../../../node_modules/lit-html/lit-html.js";

const shoeTemplate = (shoe) => html`
<li class="card">
<img src="${shoe.imageUrl}" alt="travis" />
<p>
  <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
</p>
<p>
  <strong>Model: </strong
  ><span class="model">${shoe.model}</span>
</p>
<p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
<a class="details-btn" href=${`/details/${shoe._id}`}>Details</a>
</li>`

export const dashBoardTemplate = (shoes) => html`
        <!-- Dashboard page -->
        <section id="dashboard">
          <h2>Collectibles</h2>
          ${shoes.length > 0
    ? html`
        <ul class="card-wrapper">
            <!-- Display a li with information about every post (if any)-->
           ${shoes.map(s => shoeTemplate(s))}
          </ul>
        `
    : html`<!-- Display an h2 if there are no posts -->
          <h2>There are no items added yet.</h2>`
  }
        </section>
`