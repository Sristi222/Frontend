"use client"

import React, { useState, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "./Testimonials.css"
import img from "../img/Before2.jpg"
import imgs from "../img/After2.jpg"
import before from "../img/Before3.jpg"
import after from "../img/After3.jpg"
import before4 from "../img/Before4.jpg"
import after4 from "../img/After4.jpg"
import before5 from "../img/Before5.jpg"
import after5 from "../img/After5.jpg"
import before6 from "../img/Before6.jpg"
import after6 from "../img/After6.jpg"
import house from "../img/housebefore.jpg"
import color from "../img/houseafter.jpg"

const testimonials = [
  {
    id: 1,
    name: "Shyam Maharjan",
    type: "Residential Client",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/010/967/316/non_2x/avatar-bearded-man-free-vector.jpg",
    quote:
      "My husband was out of town, so I had to take care of painting our new home on my own. I was worried at first, but thankfully, I found Dream Paints. They took care of everything so well, super professional! The final look turned out amazing. So happy with it!",
    beforeImage: img,
    afterImage: imgs,
  },
  {
    id: 2,
    name: "Purushottam Khadka",
    type: "Commercial Client",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    quote:
      "Loved their service. Everything was handled perfectly till the end. I didn't have to worry about a thing. Definitely recommend!",
    beforeImage: before,
    afterImage: after,
  },
  {
    id: 3,
    name: "Meena Nepali",
    type: "Interior Designer",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/002/002/257/small/beautiful-woman-avatar-character-icon-free-vector.jpg",
    quote:
      "A shop guy told me to try Dream Paints. They had all the color palettes. My client home looks unique now. Thanks to them!",
    beforeImage: before4,
    afterImage: after4,
  },
  {
    id: 4,
    name: "Radhika Suwal",
    type: "Homeowner",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/002/002/297/small/beautiful-woman-avatar-character-icon-free-vector.jpg",
    quote:
      "Went to Dream Paints to find a color for my living room. So many choices! The staff helped me pick the perfect one. My room looks amazing now!",
    beforeImage: before5,
    afterImage: after5,
  },
  {
    id: 5,
    name: "Sonu maya Lamichhane",
    type: "Restaurant Owner",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDH94qP1Hth7yBoc5ldevLA2vRpXw4326z_JcwN1NeWJInqKyixRxPUs0EfXlB_DjTbf8&usqp=CAU",
    quote:
      "This store has everything! So many paints, good quality, and not expensive. Staff was super nice too. Will buy again!",
    beforeImage: before6,
    afterImage: after6,
  },
  {
    id: 6,
    name: "Rajendra Basnet",
    type: "Home owner",
    avatar:
      "https://static.vecteezy.com/system/resources/thumbnails/024/183/502/small_2x/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg",
    quote:
      "I needed paint for my kitchen, and they had the perfect color. The paint was smooth and easy to use. Happy with how it turned out!",
    beforeImage: house,
    afterImage: color,
  },
]

const TruncatedQuote = ({ quote, maxLength = 150 }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (quote.length <= maxLength) {
    return <blockquote className="testimonialQuote">{quote}</blockquote>
  }

  return (
    <div className={`testimonialQuote ${isExpanded ? "expanded" : ""}`}>
      <blockquote>{isExpanded ? quote : `${quote.slice(0, maxLength)}...`}</blockquote>
      <button className="readMoreBtn" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  )
}

const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = React.useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const containerWidth = containerRect.width
      const mouseX = e.clientX - containerRect.left
      const newPosition = (mouseX / containerWidth) * 100
      setSliderPosition(Math.max(0, Math.min(100, newPosition)))
    }
  }, [])

  const handleMouseUp = useCallback(() => {
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }, [handleMouseMove])

  const handleMouseDown = (e) => {
    e.preventDefault()
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  React.useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <div className="beforeAfter" ref={containerRef}>
      <div className="imgCompContainer">
        <div className="imgCompBefore" style={{ width: `${sliderPosition}%` }}>
          <img src={beforeImage || "/placeholder.svg"} alt="Before" />
          <div className="imgLabel before">Before</div>
        </div>
        <div className="imgCompAfter">
          <img src={afterImage || "/placeholder.svg"} alt="After" />
          <div className="imgLabel after">After</div>
        </div>
        <div className="imgCompSlider" style={{ left: `${sliderPosition}%` }} onMouseDown={handleMouseDown}>
          <div className="sliderLine"></div>
          <div className="sliderHandle">
            <ChevronLeft size={20} />
            <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </div>
  )
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [isResponsive, setIsResponsive] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1)
        setIsResponsive(true)
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2)
        setIsResponsive(false)
      } else {
        setCardsPerView(3)
        setIsResponsive(false)
      }
    }

    handleResize() // Set initial value
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handlePrevClick = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - cardsPerView : current - 1))
  }

  const handleNextClick = () => {
    setActiveIndex((current) => (current === testimonials.length - cardsPerView ? 0 : current + 1))
  }

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="sectionTitle">What Our Clients Say</h2>
        <p className="sectionSubtitle">Discover why homeowners and businesses trust us for their painting needs</p>

        {isResponsive && <p className="slideInstructions">Swipe left or right to see more testimonials</p>}

        <div className="testimonialsCarousel">
          <div className="carouselTrack" style={{ transform: `translateX(-${activeIndex * (100 / cardsPerView)}%)` }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonialCard ${index >= activeIndex && index < activeIndex + cardsPerView ? "active" : ""}`}
              >
                <img src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} className="clientAvatar" />
                <div className="testimonialContent">
                  <div className="rating">★★★★★</div>
                  <TruncatedQuote quote={testimonial.quote} />
                  <div className="clientInfo">
                    <h4 className="clientName">{testimonial.name}</h4>
                    <p className="clientType">{testimonial.type}</p>
                  </div>
                </div>
                <BeforeAfterSlider beforeImage={testimonial.beforeImage} afterImage={testimonial.afterImage} />
              </div>
            ))}
          </div>
        </div>

        {!isResponsive && (
          <div className="carouselControls">
            <button onClick={handlePrevClick} className="carouselButton prev" aria-label="Previous testimonial">
              <ChevronLeft size={24} />
            </button>
            <button onClick={handleNextClick} className="carouselButton next" aria-label="Next testimonial">
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials

