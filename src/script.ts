import "./style.css"
// import "./shader"

import { gsap } from "gsap";
import { RoughEase } from "gsap/EasePack";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, RoughEase);

document.addEventListener("DOMContentLoaded", () => {
    ScrollSmoother.create({
        content: "main",
        smooth: 0.5,
        effects: true,
    });

    const roughEase = "rough({template: elastic.inOut, points: 100, randomize:true, clamp:true})";

    ScrollTrigger.create({
        id: "old-new",
        trigger: "section#now",
        start: "center center",
        end: "center+=100 center",
        scrub: 0.5,
        animation: gsap.timeline().to("section#now .new", {
            opacity: 1,
            ease: "power1.out",
        }, 0).to("section#now .old", {
            ease: "power1.out",
            opacity: 0,
        }, 0),
    })

    ScrollTrigger.create({
        id: "ai-1",
        trigger: "section#goneplenty img.ai",
        start: "center center",
        end: "center center",
        toggleActions: "play none reverse none",
        animation: gsap.timeline().to("section#goneplenty img.ai", {
            opacity: 1,
            ease: roughEase,
            duration: 0.5,
        }).to("section#goneplenty img.empty", {
            opacity: 0,
            ease: roughEase,
            duration: 0.5,
        })
    })

})