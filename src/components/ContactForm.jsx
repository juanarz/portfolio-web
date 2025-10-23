import { useState } from 'react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('t-MDcVn0eQlwZNQGY'); // Your public key

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus({ success: null, message: '' });

  try {
    await emailjs.send(
      'service_ohob4ob',
      'template_491jd0k',
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'your-email@example.com',  // Add your email here
        subject: `New message from ${formData.name} - Portfolio Contact Form`
      }
    );
    
    setSubmitStatus({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.'
    });
    setFormData({ name: '', email: '', message: '' });
  } catch (error) {
    console.error('Failed to send message:', error);
    setSubmitStatus({
      success: false,
      message: `Failed to send message. ${error.text || 'Please try again later.'}`
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 text-slate-800 dark:text-white"
          placeholder="Your name"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 text-slate-800 dark:text-white"
          placeholder="your.email@example.com"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors duration-300 resize-none text-slate-800 dark:text-white"
          placeholder="Your message..."
        ></textarea>
      </div>
      
      {submitStatus.message && (
        <div className={`p-4 rounded-lg ${
          submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {submitStatus.message}
        </div>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
