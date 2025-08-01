import "./style.css"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
    content: "main",
    smooth: 0.5,
    effects: true,
});

ScrollTrigger.defaults({
    markers: true,
})

ScrollTrigger.create({
    id: "old-new",
    trigger: "section#now",
    start: "top top",
    end: "bottom top",
    pin: true,
    scrub: 0.5,
    animation: gsap.timeline().to("section#now .new", {
        opacity: 1,
        ease: "power1.out",
        delay: 0.1,
    }, 0).to("section#now .old", {
        delay: 0.1,
        opacity: 0,
        ease: "power1.out",
    }, 0),
})