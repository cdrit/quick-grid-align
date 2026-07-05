import { MODULE_ID } from "./constants.js";
import { QuickGridAlign } from "./app.js";

function normalizeHtml(html) {
    return html instanceof HTMLElement ? html : html?.[0];
}

export function initConfig() {
    Hooks.on("renderSceneConfig", (app, html) => {
        const element = normalizeHtml(html);
        if (!element || element.querySelector(`button.${MODULE_ID}`)) return;

        const quickGridButton = document.createElement("button");
        quickGridButton.type = "button";
        quickGridButton.classList.add(MODULE_ID);
        quickGridButton.dataset.tooltip = game.i18n.localize(`${MODULE_ID}.tooltip`);
        quickGridButton.innerHTML = `<i class="fa-duotone fa-grid"></i>`;
        quickGridButton.addEventListener("click", (event) => {
            event.preventDefault();
            new QuickGridAlign(app.document ?? app.object).render(true);
        });

        const gridConfig = element.querySelector(".grid-config")
            ?? element.querySelector('[name="grid.size"]')?.closest(".form-group")
            ?? element.querySelector('[data-tab="grid"] .form-group');
        gridConfig?.insertAdjacentElement("afterend", quickGridButton);
    });
}
