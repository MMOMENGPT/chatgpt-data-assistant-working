"use strict";
import "./../style/visual.less";

export class Visual implements powerbi.extensibility.visual.IVisual {
    private target: HTMLElement;

    constructor(options: powerbi.extensibility.visual.VisualConstructorOptions) {
        this.target = options.element;
        this.renderUI();
    }

    private renderUI(): void {
        this.target.innerHTML = `
            <div style="font-family: Arial; padding: 10px;">
                <textarea id="gpt-question" placeholder="Ask a question..." style="width:100%; height:60px;"></textarea>
                <button id="ask-btn">Ask GPT</button>
                <div id="gpt-response" style="margin-top:10px; white-space:pre-wrap;"></div>
            </div>
        `;

        const btn = document.getElementById("ask-btn")!;
        const responseEl = document.getElementById("gpt-response")!;

        btn.addEventListener("click", async () => {
            const question = (document.getElementById("gpt-question") as HTMLTextAreaElement).value;

            responseEl.textContent = "Thinking...";

            try {
                const res = await fetch("https://render-gpt-backend.onrender.com/gpt-query", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question, context: {} })
                });

                const data = await res.json();
                responseEl.textContent = data.answer || "No response.";
            } catch (err) {
                responseEl.textContent = "Error: " + err.message;
            }
        });
    }

    public update(): void {}
}