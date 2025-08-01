import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
    markers: true,
})

const tl = gsap.timeline().to("img.cover-background", {
    scale: 0.8,
    duration: 1,
    delay: 1,
}).to("img.cover-foreground", {
    y: () => -window.innerHeight * 3 / 2 + (document.querySelector("img.cover-foreground")?.clientHeight ?? 0) / 2 - 50,
    duration: 1,
    delay: 1,
}).addPause("+=1");

ScrollTrigger.create({
    trigger: "section#cover",
    start: "top top",
    end: "bottom+=1000 top",
    scrub: 0.5,
    pin: true,
    onUpdate: (self) => { console.log(self.progress.toFixed(3)) },
    animation: tl,
})