import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] flex flex-col px-4 sm:px-4 lg:px-4 xl:px-3">
    {/* Existing Hero Section */}
    <div className="flex flex-1 items-center justify-between gap-28 mx-auto py-12 flex-col lg:flex-row">
      <div className="max-w-xl text-center lg:text-left">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 text-gray-800">
          <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            Organize Your Life
          </span>
          <br />
          With Our Todo App
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
          The most intuitive way to manage your tasks.
          <br />
          Join millions of productive people worldwide.
        </p>

        <div className="flex gap-4 mb-12 justify-center lg:justify-start">
          <Link
            to="/login"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 rounded-lg border-2 border-[#667eea] text-[#667eea] font-semibold hover:bg-[#667eea]/10 hover:-translate-y-0.5 transition-all duration-300"
          >
            Create Account
          </Link>
        </div>

        <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
          {['Sync across all devices', 'Secure cloud storage', 'Smart reminders'].map(
            (feature, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-600">
                <div className="w-6 h-6 bg-[#667eea] text-white rounded-full flex items-center justify-center text-xs">
                  ✓
                </div>
                <span>{feature}</span>
              </div>
            )
          )}
        </div>
      </div>

      <div className="relative">
        <div className="w-72 sm:w-80 h-[36rem] bg-gray-800 border-8 border-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="w-full h-full bg-white rounded-2xl flex flex-col">
            <div className="flex-1 p-5 flex flex-col">
              <div className="mb-5">
                <h3 className="text-2xl font-semibold text-gray-800">My Tasks</h3>
                <span className="text-sm text-gray-500">Today, June 12</span>
              </div>
              <div className="flex-1">
                {[
                  { text: 'Morning workout', completed: true },
                  { text: 'Team meeting @ 10AM', active: true },
                  { text: 'Finish project proposal' },
                  { text: 'Grocery shopping' },
                  { text: 'Call mom for birthday' },
                ].map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center py-3 border-b border-gray-100"
                  >
                    <div
                      className={`w-5 h-5 rounded mr-3 flex items-center justify-center ${
                        task.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : task.active
                          ? 'border-blue-500'
                          : 'border-gray-300'
                      } border-2`}
                    >
                      {task.completed && '✓'}
                    </div>
                    <span
                      className={`${task.completed ? 'line-through text-gray-400' : ''}`}
                    >
                      {task.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-4">
                <input
                  type="text"
                  placeholder="Add new task..."
                  className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Existing Footer with Company Logos */}
    <div className="text-center py-8 text-gray-500">
      <p className="mb-6">Trusted by over 5 million users worldwide</p>
      <div className="flex flex-wrap justify-center items-center gap-6 px-4">
        {[
          {
            href: 'https://www.google.com',
            src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
            alt: 'Google',
            height: 'h-8',
          },
          {
            href: 'https://www.microsoft.com',
            src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
            alt: 'Microsoft',
            height: 'h-7',
          },
          {
            href: 'https://www.airbnb.com',
            src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg',
            alt: 'Airbnb',
            height: 'h-9',
          },
          {
            href: 'https://www.shopify.com',
            src: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg',
            alt: 'Shopify',
            height: 'h-10',
          },
          {
            href: 'https://www.slack.com',
            src: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
            alt: 'Slack',
            height: 'h-8',
          },
        ].map((logo, index) => (
          <a
            key={index}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 flex items-center hover:-translate-y-1 transition-transform duration-300"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className={`${logo.height} w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300`}
            />
          </a>
        ))}
      </div>
    </div>

    {/* New Features Section */}
    <div className="py-16 max-w-5xl mx-auto px-4">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
        Why Choose Our Todo App?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: 'Task Prioritization',
            description: 'Easily prioritize tasks to focus on what matters most.',
            icon: '⭐',
          },
          {
            title: 'Team Collaboration',
            description: 'Share tasks and collaborate with your team in real-time.',
            icon: '🤝',
          },
          {
            title: 'Offline Mode',
            description: 'Manage tasks even without an internet connection.',
            icon: '📴',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>

    {/* New Testimonials Section */}
    <div className="py-16 bg-gray-100">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
        What Our Users Say
      </h2>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row gap-8 overflow-x-auto snap-x snap-mandatory">
          {[
            {
              name: 'Sarah J.',
              role: 'Freelancer',
              quote:
                'This Todo App has transformed how I manage my projects. The interface is so intuitive!',
            },
            {
              name: 'Michael T.',
              role: 'Team Lead',
              quote:
                'Collaborating with my team has never been easier. The real-time sync is a game-changer.',
            },
            {
              name: 'Emily R.',
              role: 'Student',
              quote:
                'I stay on top of my assignments and personal tasks, even offline. Highly recommend!',
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md min-w-[300px] snap-center animate-slide-in"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name[0]}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* New Call-to-Action Section */}
    <div className="py-16 max-w-5xl mx-auto px-4 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
        Ready to Get Organized?
      </h2>
      <p className="text-lg text-gray-600 mb-10">
        Join millions of users and take control of your tasks today with Mansoor's Todo App.
      </p>
      <Link
        to="/register"
        className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-lg"
      >
        Start Now for Free
      </Link>
    </div>

    {/* New Creator Footer */}
    <div className="py-8 text-center text-gray-500 border-t border-gray-200">
      <p>
        Created with ❤️ by{' '}
        <span className="font-semibold text-gray-800">Mansoor</span> for a more organized world.
      </p>
      <p className="mt-2 text-sm">&copy; 2025 Mansoor's Todo App. All rights reserved.</p>
    </div>
  </div>
);

export default Welcome;