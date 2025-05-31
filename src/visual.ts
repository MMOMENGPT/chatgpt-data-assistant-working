"use strict";

import "core-js/stable";
import "./../style/visual.less";

import powerbi from "powerbi-visuals-api";
import IVisual = powerbi.extensibility.visual.IVisual;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;

export class Visual implements IVisual {
    private target: HTMLElement;

    constructor(options: VisualConstructorOptions) {
        this.target = options.element;
        this.renderUI();
    }

    private renderUI(): void {
        this.target.innerHTML = `
            <div style="padding:10px; font-family:Arial; font-size:14px;">
                ✅ GPT Chat Visual Loaded Successfully!
                <br><br>
                <textarea id="question" style="width:100%; height:60px;"></textarea>
                <button id="ask-btn">Ask GPT</button>
                <div id="response" style="margin-top:10px;"></div>
            </div>
        `;

        const button = this.target.querySelector("#ask-btn") as HTMLButtonElement;
        const textarea = this.target.querySelector("#question") as HTMLTextAreaElement;
        const responseBox = this.target.querySelector("#response") as HTMLElement;

        button.onclick = async () => {
            const q = textarea.value;
            responseBox.textContent = "Thinking...";
            try {
                const res = await fetch("https://render-gpt-backend.onrender.com/gpt-query", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question: q })
                });
                const json = await res.json();
                responseBox.textContent = json.answer || "No answer received.";
            } catch (err) {
                responseBox.textContent = "Error: " + err.message;
            }
        };
    }

    public update(_: VisualUpdateOptions): void {}
}