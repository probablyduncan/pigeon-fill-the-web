import "./style.css"
// import "./shader"

import { gsap } from "gsap"
import { RoughEase } from "gsap/EasePack"
import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { ScrollSmoother } from "gsap/ScrollSmoother"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(
    ScrollTrigger,
    // ScrollSmoother,
    RoughEase,
    SplitText
)

document.addEventListener("DOMContentLoaded", () => {
    // ScrollSmoother.create({
    //     content: "main",
    //     smooth: 0.5,
    //     effects: true,
    // })

    const roughEase = "rough({template: elastic.inOut, points: 100, randomize:true, clamp:true})"

    ScrollTrigger.create({
        id: "title-icon",
        trigger: "#title-wrapper",
        start: "top top",
        end: "center top",
        scrub: 0.5,
        // markers: true,
        animation: gsap.to("#title img", {
            y: -90,
            x: -60,
            scale: 2,
        })
    })

    ScrollTrigger.create({
        id: "old-new",
        trigger: "#now",
        start: "center center",
        toggleActions: "play none none reverse",
        // markers: true,
        animation: gsap.timeline().to("#now .new", {
            opacity: 1,
            ease: "power1.out",
        }, 0).to("#now .old", {
            ease: "power1.out",
            opacity: 0,
        }, 0),
    })

    ScrollTrigger.create({
        id: "ai-1",
        trigger: "#goneplenty .stack",
        start: "center-=100 center",
        // markers: true,
        toggleActions: "play none none reverse",
        animation: gsap.timeline().to("#goneplenty img.pigeon", {
            opacity: 1,
            ease: roughEase,
            duration: 0.5,
        })
    })

    ScrollTrigger.create({
        id: "ai-2",
        trigger: "#ai-2",
        start: "top bottom",
        end: "bottom bottom",
        toggleActions: "none play none reset",
        // markers: true,
        animation: gsap.to("#ai-2 img", {
            opacity: 1,
            stagger: .1,
            duration: 0.2,
            ease: roughEase,
        })
    })

    ScrollTrigger.create({
        id: "fullspread",
        trigger: "#fullspread",
        start: "top bottom",
        end: "bottom bottom",
        // markers: true,
        toggleActions: "none play none reset",
        animation: gsap.timeline().to("#fullspread img.pigeon", {
            opacity: 0,
            duration: 0.05,
            yoyo: true,
            repeat: 3,
        }).to("#fullspread img.pigeon", {
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
        trigger: "#oyster",
        toggleActions: "play none none reset",
        start: "center+=100 center",
        // markers: true,
        animation: gsap.to("#oyster .show-on-move", {
            opacity: 1,
            yoyo: true,
            repeat: 4,
            repeatDelay: 0.0333,
            duration: 0.0333,
        }),
    })

    ScrollTrigger.create({
        id: "overflow",
        trigger: "#overflow .stack",
        toggleActions: "none play none reset",
        start: "top bottom",
        end: "bottom bottom",
        // markers: true,
        animation: gsap.timeline().to("#overflow img:not(.final)", {
            stagger: 0.1,
            ease: roughEase,
            autoAlpha: 0,
            duration: 0.1,
            reversed: true,
        })
    })

    ScrollTrigger.create({
        id: "cgp",
        trigger: "#cgp .stack",
        toggleActions: "none play none reset",
        start: "top bottom",
        end: "bottom bottom",
        // markers: true,
        animation: gsap.timeline().to("#cgp img:not(.final)", {
            stagger: 0.2,
            autoAlpha: 0,
            duration: 0.1,
            reversed: true,
        }, 0).from("#cgp .label", {
            stagger: 0.3,
            autoAlpha: 0,
            duration: 0.1,
        }, 0.5)
    })

    ScrollTrigger.create({
        id: "clockwise",
        trigger: "#clockwise > div",
        toggleActions: "none play none reset",
        start: "top bottom",
        end: "bottom bottom",
        // markers: true,
        animation: gsap.timeline().to("#clockwise img:not(.final)", {
            stagger: 0.3,
            ease: roughEase,
            autoAlpha: 0,
            duration: 0.5,
            reversed: true,
        }, 0).from("#clockwise > div > div", {
            stagger: 0.15,
            autoAlpha: 0,
            ease: roughEase,
            duration: 0.1,
        }, 0.3)
    })

    function toggleNavFont(wonky: boolean) {
        document.querySelectorAll(".top-left, .top-right, .bottom-left, .bottom-right").forEach(_e => {
            wonky ? _e.classList.add("wonky") : _e.classList.remove("wonky")
        })
    }

    ScrollTrigger.create({
        id: "names-3",
        trigger: "#names-3 > div",
        toggleActions: "none play none reset",
        start: "top bottom",
        end: "bottom bottom",
        // markers: true,
        animation: gsap.timeline()
            .to("#names-3 img:not(.final)", {
                stagger: 0.5,
                ease: roughEase,
                autoAlpha: 0,
                duration: 0.5,
                reversed: true,
            }, 0).from("#names-3 > div > div", {
                stagger: 0.06,
                autoAlpha: 0,
                ease: roughEase,
                duration: 0.1,
            }, 0.3).eventCallback("onStart", () => toggleNavFont(true)),
        onLeaveBack: () => toggleNavFont(false),
    })

    ScrollTrigger.create({
        id: "chimney-top",
        trigger: "#chimney-top",
        toggleActions: "none play none reset",
        start: "top bottom",
        end: "center center",
        // markers: true,
        animation: gsap.timeline()
            .to("#chimney-top img:not(.final)", {
                autoAlpha: 0,
                duration: 0.2,
                stagger: 0.5,
                ease: roughEase,
                reversed: true,
            }, 0)
            .from("#chimney-top .label", {
                stagger: 0.01,
                autoAlpha: 0,
                ease: roughEase,
                duration: 0.1,
                delay: 0.5,
            }, 0.3)
    })

    ScrollTrigger.create({
        id: "chimney-middle",
        trigger: "#chimney-middle",
        toggleActions: "none play none reset",
        start: "top bottom",
        end: "top bottom",
        // markers: true,
        animation: gsap.timeline()
            // .to("#chimney-middle img:not(.final)", {
            //     autoAlpha: 0,
            //     duration: 0.2,
            //     stagger: 0.5,
            //     ease: roughEase,
            //     reversed: true,
            // }, 0)
            .from("#chimney-middle .label", {
                stagger: 0.01,
                autoAlpha: 0,
                ease: roughEase,
                duration: 0.1,
                delay: 0,
            }, 0.3)
    })

    ScrollTrigger.create({
        id: "chimney-ground",
        trigger: "#chimney-ground",
        toggleActions: "none play none reset",
        start: "top bottom",
        end: "top bottom",
        animation: gsap.timeline()
            // .to("#chimney-ground img:not(.final)", {
            //     autoAlpha: 0,
            //     duration: 0.2,
            //     stagger: 0.5,
            //     ease: roughEase,
            //     reversed: true,
            // }, 0)
            .from("#chimney-ground .label", {
                stagger: 0.2,
                autoAlpha: 0,
                ease: roughEase,
                duration: 0.1,
                delay: 0,
            }, 0.3)
    })

    // so how am I gonna do this?
    // first, there are a bunch of popups
    // then, the sky comes in:
    // first, it's empty
    // then we see that glitch
    // then empty, then imagination elephant, then empty sky again
    // then the popups start disappearing?
    // but the sky remains, flickering artifacts, into emptiness

    // so I need to figure out how this works in two places: html/css and gsap
    const popupAnimation = gsap.timeline()
        .to("#glitch-popups > *", {
            // first, pop glitches onto the screen
            stagger: 0.1,
            autoAlpha: 1,
            duration: 0.001,
        })
        .to("#first-sky img", {
            // tease the sky
            stagger: 0.3,
            autoAlpha: 1,
            duration: 0,
            delay: 0.1,
        })

        // .to("#elephant", {
        //     autoAlpha: 1,
        //     duration: 0,
        //     delay: 0.3,
        //     repeatDelay: 0.1,
        //     yoyo: true,
        //     repeat: 3,
        // })

        // .to("#imagination-popups img", {
        //     stagger: 0.1,
        //     autoAlpha: 1,
        //     duration: 0,
        //     delay: 0.1,
        // })

        // .to("#imagination-popups img, #elephant", {
        //     autoAlpha: 0,
        //     duration: 0,
        //     delay: 0,
        // })

        .to("#sky-glitch", {
            autoAlpha: 1,
            duration: 0,
            delay: 0.2,
        })

        .to("#glitch-popups > *", {
            // clear out glitches
            delay: 0.5,
            stagger: 0.02,
            autoAlpha: 0,
            duration: 0.001,
        })
        .to("#sky-glitch", {
            autoAlpha: 0,
            duration: 0,
            delay: 0,
        }, "-=0.2")

        .to("#last-sky", {

            autoAlpha: 1,
            duration: 0,
            delay: 0.2,
        })
        .to("#first-sky img", {
            autoAlpha: 0,
            duration: 0,
            delay: 0,
        })

        .to("#last-sky", {

            autoAlpha: 0,
            duration: 1,
            delay: 2,
        })

    ScrollTrigger.create({
        id: "popups",
        trigger: "#popup-section",
        scrub: true,
        start: "top center",
        end: "bottom center",
        // markers: true,
        animation: popupAnimation,
    })

    // ScrollTrigger.create({
    //     id: "sky-catcher",
    //     trigger: "#sky-catcher",
    //     start: "center center",
    //     end: "bottom top",
    //     scrub: true,
    //     animation: gsap.timeline()
    //         .to("#sky-catcher img", {
    //             autoAlpha: 1,
    //             duration: 0,
    //         })
    // })

    // document.querySelectorAll("#chimney .stack")?.forEach(_e => (_e as HTMLElement).addEventListener("click", e => {
    //     const rect = (e.target as HTMLElement).getBoundingClientRect()
    //     const label = `<div class="label left-[${(100 * e.layerX / rect.width).toFixed(1)}%] top-[${(100 * e.layerY / rect.height).toFixed(1)}%] rotate-[-6deg] translate-x-[-50%] translate-y-[-50%]">NAMENAMENAME</div>`
    //     console.log(label)
    //     navigator.clipboard.writeText(label)
    // }))

    document.getElementById("chimney-last")!.addEventListener("click", e => {
        const rect = (e.target as HTMLElement).getBoundingClientRect()
        const img = `<img src="/public/ii/14/1.webp" class="left-[${(100 * e.layerX / rect.width).toFixed(1)}%] top-[${(100 * e.layerY / rect.height).toFixed(1)}%]" />`
        console.log(img)
        navigator.clipboard.writeText(img)
    })

    ScrollTrigger.create({
        id: "reset-nav-font",
        trigger: "#old-enough-2",
        start: "top center",
        onEnter: () => toggleNavFont(false),
        onLeaveBack: () => toggleNavFont(true),
    })

    ScrollTrigger.create({
        id: "cambridge-split",
        trigger: "#cambridge-split",
        scrub: 0.5,
        start: "bottom bottom",
        end: "center top",
        // pin: true,
        // markers: true,
        animation: gsap.timeline().to("#cambridge-rect", {
            x: -3000,
            rotate: -20,
            ease: "none",
        }).to("#cambridge-rect", {
            x: -4000,
            rotate: 0,
            ease: "none",
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
    const subtitleWrapper = subtitleHolder.parentElement!
    const subtitleContainer = subtitleWrapper.parentElement!
    if (!subtitleHolder || !subtitleWrapper || !subtitleContainer) {
        return
    }

    function toggleSubtitle(show: boolean) {
        subtitleWrapper.style.display = show ? "unset" : "none"
    }

    function toggleWonk(wonky: boolean) {
        wonky ? subtitleWrapper.classList.add("wonky") : subtitleWrapper.classList.remove("wonky")
    }

    const subtitles: {
        trigger: Element,
        text: string,
        start: string,
        end: string,
        wonky: boolean,
    }[] = []

    document.querySelectorAll("[data-subtitle]").forEach(_e => {
        const e = _e as HTMLElement
        const [start, end] = e.dataset.subtitleStartEnd?.split(",")
            ?? ["top center", "bottom center"]

        subtitles.push({
            trigger: e,
            text: e.dataset.subtitle!,
            start, end,
            wonky: e.hasAttribute("data-subwonky"),
        })
    })

    const splitType = "words"
    let currentSplit: SplitText | undefined

    function enter(data: typeof subtitles[number]) {
        currentSplit?.revert()
        toggleSubtitle(false)
        toggleWonk(data.wonky)
        subtitleHolder.innerHTML = data.text
        currentSplit = SplitText.create("#subtitle", {
            type: splitType,
            reduceWhiteSpace: false,
            tag: "div",
            wordsClass: "word",
            mask: "words",
            onSplit: (split) => gsap.timeline({
                onStart: () => { toggleSubtitle(true) },
                onComplete: () => { split.revert() },
            }).from(split[splitType], {
                duration: .01,
                stagger: .1,
                display: "none",
                // autoAlpha: 0,
            }, 0.01)
        })
    }

    function exit() {
        currentSplit?.revert()
        currentSplit = SplitText.create("#subtitle", {
            type: splitType,
            reduceWhiteSpace: false,
            tag: "div",
            wordsClass: "word",
            mask: "words",
            onSplit: (split) => gsap.timeline({
                onComplete: () => {
                    toggleSubtitle(false)
                    split.revert()
                    subtitleHolder.innerHTML = ""
                },
            }).to(split[splitType], {
                duration: .01,
                stagger: .05,
                display: "none",
                // autoAlpha: 0,
                reversed: true,
            })
        })
    }


    for (const subtitle of subtitles) {

        ScrollTrigger.create({
            id: "text__" + subtitle.text.replaceAll(" ", "_"),
            trigger: subtitle.trigger,
            onEnter: () => enter(subtitle),
            onEnterBack: () => enter(subtitle),
            onLeave: exit,
            onLeaveBack: exit,
            start: subtitle.start,
            end: subtitle.end,
            // markers: true,
        })
    }
}