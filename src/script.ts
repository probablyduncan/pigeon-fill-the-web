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
        markers: true,
        animation: gsap.timeline().to("section#now .new", {
            opacity: 1,
            ease: "power1.out",
        }, 0).to("section#now .old", {
            ease: "power1.out",
            opacity: 0,
        }, 0),
    })

    ScrollTrigger.create({
        id: "foreshadowing",
        trigger: "section#mostlyempty .stack",
        start: "bottom top+=300",
        markers: {
            indent: 600,
        },
        toggleActions: "play none none reset",
        animation: gsap.timeline().to("section#mostlyempty img.glitch", {
            opacity: 1,
            repeat: 3,
            repeatDelay: 0.1,
            duration: 0.1,
        }, 0).to("section#mostlyempty img.glitch", {
            opacity: 0,
            duration: 0.01,
        }, 1)
    })

    ScrollTrigger.create({
        id: "ai-1",
        trigger: "section#goneplenty .stack",
        start: "center-=100 center",
        markers: true,
        toggleActions: "play none none reverse",
        animation: gsap.timeline().to("section#goneplenty img.pigeon", {
            opacity: 1,
            ease: roughEase,
            duration: 0.5,
        })
    })

})