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

    // ScrollTrigger.create({
    //     id: "cover",
    //     trigger: "#cover",
    //     start: "top top",
    //     end: "bottom top",
    //     markers: true,
    //     pin: true,
    //     scrub: 0.5,
    //     animation: gsap.to("#cover img#pigeon", {
    //         y: 0,
    //     }),
    // })

    ScrollTrigger.create({
        id: "old-new",
        trigger: "section#now",
        start: "center center",
        end: "center+=100 center",
        scrub: 0.5,
        // markers: true,
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
        trigger: "section#goneplenty .stack",
        start: "center-=100 center",
        // markers: true,
        toggleActions: "play none none reverse",
        animation: gsap.timeline().to("section#goneplenty img.pigeon", {
            opacity: 1,
            ease: roughEase,
            duration: 0.5,
        })
    })

    ScrollTrigger.create({
        id: "fullspread",
        trigger: "section#fullspread",
        start: "center+=100 center",
        // markers: true,
        toggleActions: "play none none none",
        animation: gsap.timeline().to("section#fullspread img.pigeon", {
            opacity: 0,
            duration: 0.05,
            yoyo: true,
            repeat: 3,
        }).to("section#fullspread img.pigeon", {
            opacity: 0,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
        }),
        onEnter: () => {
            document.querySelectorAll(".visible-after-ai").forEach(e => { (e as HTMLElement).style.opacity = "1" });
        },
    })

    ScrollTrigger.create({
        id: "oyster",
        trigger: "section#oyster",
        toggleActions: "play none none reset",
        start: "center+=100 center",
        // markers: true,
        animation: gsap.to("section#oyster .show-on-move", {
            opacity: 1,
            yoyo: true,
            repeat: 5,
            repeatDelay: 0.0333,
            duration: 0.0333,
        }),
    })


    initShowHideOnMove()
    initShowHideOnScroll()
    initShowHideAfterPass()
})


function initShowHideOnMove() {

    document.querySelectorAll(".stack:has(.show-on-move, .hide-on-move)").forEach(_e => {

        const wrapperEl = _e as HTMLElement
        const showEls = wrapperEl.querySelectorAll(".show-on-move")
        const hideEls = wrapperEl.querySelectorAll(".hide-on-move")
        let timeoutId: number | undefined

        function onMove() {

            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            else {
                showEls.forEach(e => (e as HTMLElement).style.opacity = "1")
                hideEls.forEach(e => (e as HTMLElement).style.opacity = "0")
            }

            timeoutId = setTimeout(() => {
                showEls.forEach(e => (e as HTMLElement).style.opacity = "0")
                hideEls.forEach(e => (e as HTMLElement).style.opacity = "1")
                timeoutId = undefined;
            }, 1);
        }

        wrapperEl.addEventListener("mousemove", onMove)
        wrapperEl.addEventListener("touchmove", onMove)
    })
}

function initShowHideOnScroll() {
    document.querySelectorAll(".stack:has(.show-on-scroll, .hide-on-scroll)").forEach(_e => {

        const wrapperEl = _e as HTMLElement
        const showEls = wrapperEl.querySelectorAll(".show-on-scroll")
        const hideEls = wrapperEl.querySelectorAll(".hide-on-scroll")
        let timeoutId: number | undefined

        function onMove() {

            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            else {
                showEls.forEach(e => (e as HTMLElement).style.opacity = "1")
                hideEls.forEach(e => (e as HTMLElement).style.opacity = "0")
            }

            timeoutId = setTimeout(() => {
                showEls.forEach(e => (e as HTMLElement).style.opacity = "0")
                hideEls.forEach(e => (e as HTMLElement).style.opacity = "1")
                timeoutId = undefined;
            }, 1);
        }

        window.addEventListener("scroll", onMove)
    })
}

function initShowHideAfterPass() {
    document.querySelectorAll(".stack:has(.show-after-scroll-past, .hide-after-scroll-past)").forEach(e => {
        e.querySelectorAll(".show-after-scroll-past").forEach(e => initScrollPastTrigger(e, true))
        e.querySelectorAll(".hide-after-scroll-past").forEach(e => initScrollPastTrigger(e, false))
    })

    function initScrollPastTrigger(trigger: Element, show: boolean) {
        ScrollTrigger.create({
            trigger,
            start: "bottom top",
            end: "bottom top",
            // markers: true,
            toggleActions: "play none none none",
            animation: gsap.to(trigger, {
                opacity: show ? 1 : 0,
                duration: 0.01,
            })
        })
    }
}