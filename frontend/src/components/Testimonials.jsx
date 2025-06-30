import React from "react";
import Slider from "react-slick";

const testimonials = [
  {
    name: "John Smith",
    role: "Startup Founder",
    quote: "This platform helped me save and invest wisely. My credit score improved in just 3 months!",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Rachel Green",
    role: "Freelancer",
    quote: "Managing my monthly expenses has never been easier. The UI is super clean and effective!",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Jane Doe",
    role: "Salaried Professional",
    quote: "I love how the analytics section gives me real insights. Totally worth the subscription.",
    image: "https://randomuser.me/api/portraits/men/75.jpg"
  }
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false
  };

  return (
    <section className="bg-gray-100 py-20 px-6" id="testimonials">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
        <p className="text-gray-600 mb-10">Real stories from people who achieved financial control with us.</p>

        <Slider {...settings}>
          {testimonials.map((t, i) => (
            <div key={i} className="px-6">
              <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                />
                <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
                <h4 className="text-lg font-semibold text-blue-700">{t.name}</h4>
                <span className="text-sm text-gray-500">{t.role}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
