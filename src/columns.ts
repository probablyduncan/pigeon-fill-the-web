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

// ScrollTrigger.create({
//     id: "those-were-the-days",
//     trigger: "section#thosewerethedays",
//     start: "center center-=300",
//     end: "center top-=1000",
//     pin: true,
//     scrub: true,
//     animation: gsap.to("section#thosewerethedays p", {
//         y: -200,
//     }),
// })

ScrollTrigger.create({
    id: "old-new",
    trigger: "section#now",
    start: "top top",
    end: "bottom top-=700",
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