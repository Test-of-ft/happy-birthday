// Global variables
const birthdayMap = {
    2024: "2024-12-04",
    2025: "2025-12-04",
    2026: "2026-12-04",
    2027: "2027-12-04",
    2028: "2028-12-04",
    2029: "2029-12-04",
    2030: "2030-12-04",
}
const $btn = $("#birth-start-btn")
const $main = $(".main")
let intervalId = null
let snowflakes = null

// Page loaded
$(document).ready(function () {
    // Snowflakes falling
    snowflakes = new Snowflakes({
        color: "#ffd700", // Snowflakes color
        minSize: 20,      // Minimum snowflake size
    })
    // Fade out content
    $main.fadeOut(1)
    // Birthday countdown
    intervalId = setInterval(birthdayCountdown, 1000)
    // Button click
    $btn.click(pageRender)
})

function birthdayCountdown() {
    // Get current time and this year's birthday
    const now = dayjs()
    const curYearStr = now.format("YYYY")
    let birthday = dayjs(birthdayMap[curYearStr])

    // On the birthday, stop the countdown, unlock button to make it clickable
    if (now.format("YYYY-MM-DD") === birthday.format("YYYY-MM-DD")) {
        clearInterval(intervalId)
        $btn.text("Come on, show it")
        $btn.prop("disabled", false)
        return
    }

    // If this year's birthday has passed, calculate the time until next year's birthday
    if (now.isAfter(birthday)) {
        birthday = dayjs(birthdayMap[parseInt(curYearStr) + 1])
    }

    // Calculate the difference between now and the target date (in seconds), and convert it to days, hours, minutes, and seconds
    const diffInSeconds = birthday.diff(now, "second")
    const days = Math.floor(diffInSeconds / (3600 * 24))
    const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((diffInSeconds % 3600) / 60)
    const seconds = diffInSeconds % 60

    // Build time string
    const timeStrArr = []
    if (days > 0) {
        timeStrArr.push(`${days} days`)
    }
    if (hours > 0 || days > 0) {
        timeStrArr.push(`${hours} hours`)
    }
    if (minutes > 0 || hours > 0 || days > 0) {
        timeStrArr.push(`${minutes} minutes`)
    }
    timeStrArr.push(`${seconds} seconds`)

    $btn.text(diffInSeconds <= 0 ? "The specified birthday has passed" : timeStrArr.join(""))
}

function pageRender() {
    // Close snowflakes, fade out cover
    snowflakes.destroy()
    $(".birth-cover-container").fadeOut(1500)

    // Fade in content, play song, release balloons, show greeting
    $main.fadeIn("slow")
    $(".song")[0].play()
    $(".brith-balloon").animate({ top: -500 }, 8000)
    new Typed("#typed", {
        stringsElement: "#greeting-word",
        typeSpeed: 50,
        backSpeed: 25,
        loop: true,
    })
}
