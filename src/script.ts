import "./style.css"
// import "./shader"

import { gsap } from "gsap"
import { RoughEase } from "gsap/EasePack"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, RoughEase, SplitText)

document.addEventListener("DOMContentLoaded", () => {
    ScrollSmoother.create({
        content: "main",
        smooth: 0.5,
        effects: true,
    })

    const roughEase = "rough({template: elastic.inOut, points: 100, randomize:true, clamp:true})"

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
        toggleActions: "play none none reverse",
        // scrub: 0.5,
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
            document.querySelectorAll(".visible-after-ai").forEach(e => { (e as HTMLElement).style.opacity = "1" })
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
    initSubtitles()
})


function initShowHideOnMove() {

    document.querySelectorAll(".stack:has(.show-on-move, .hide-on-move)").forEach(_e => {

        const wrapperEl = _e as HTMLElement
        const showEls = wrapperEl.querySelectorAll(".show-on-move")
        const hideEls = wrapperEl.querySelectorAll(".hide-on-move")
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
                timeoutId = undefined
            }, 1)
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
                timeoutId = undefined
            }, 1)
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

function initSubtitles() {

    const subtitleHolder = document.getElementById("subtitle")!
    if (!subtitleHolder) {
        return
    }

    const subtitles: {
        trigger: Element,
        text: string,
    }[] = []

    const xSpacing = ""//"&nbsp;&nbsp;"
    document.querySelectorAll("[data-subtitle]").forEach(_e => {
        subtitles.push({
            trigger: _e,
            text: xSpacing + (_e as HTMLElement).dataset.subtitle! + xSpacing,
        })
    })

    // const split = SplitText.create(subtitleHolder, { type: "words", })
    // const splitVars: SplitText.Vars = {
    //     type: "words",
    //     autoSplit: true,
    //     onSplit: (self: SplitText) => {
    //         console.log(self.words)
    //         return gsap.from(self.words, {
    //             duration: 1,
    //             stagger: 0.05
    //         })
    //     }
    // }

    const splitType = "words";
    let currentSplit: SplitText | undefined;

    const wordFromVars: gsap.TweenVars = {
        duration: 0.01,
        stagger: 0.1,
        display: "none"
    }

    function enter(st: ScrollTrigger, text: string) {
        currentSplit?.revert()
        subtitleHolder.style.display = "none"
        subtitleHolder.innerHTML = text
        currentSplit = SplitText.create("#subtitle", {
            type: splitType,
            reduceWhiteSpace: false,
            onSplit: (split) => gsap.timeline({
                onStart: () => { subtitleHolder.style.display = "unset" },
                onComplete: () => { split.revert() },
            }).from(split[splitType], {
                duration: 0.01,
                stagger: 0.1,
                display: "none"
            }, 0.01)
        })
    }

    function exit(st: ScrollTrigger) {
        currentSplit?.revert()
        currentSplit = SplitText.create("#subtitle", {
            type: splitType,
            reduceWhiteSpace: false,
            onSplit: (split) => gsap.timeline({
                onComplete: () => {
                    subtitleHolder.style.display = "none"
                    split.revert()
                    subtitleHolder.innerHTML = ""
                },
            }).to(split[splitType], {
                duration: 0.01,
                stagger: 0.1,
                display: "none",
                reversed: true,
            })
        })
    }


    for (const subtitle of subtitles) {

        const onEnter = (self: ScrollTrigger) => enter(self, subtitle.text)

        ScrollTrigger.create({
            id: "text__" + subtitle.text.replaceAll(" ", "_"),
            trigger: subtitle.trigger,
            onEnter: onEnter,
            onEnterBack: onEnter,
            onLeave: exit,
            onLeaveBack: exit,
            start: "top center",
            end: "bottom center",
            // markers: true,
        })
    }
}