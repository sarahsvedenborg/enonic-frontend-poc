export default function ContactPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
                <p className="text-gray-600 mt-2">
                    Get in touch with us
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Contact Information
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="text-2xl">📧</div>
                            <div>
                                <div className="font-medium text-gray-900">Email</div>
                                <div className="text-gray-600">hello@sanityfrontend.com</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="text-2xl">📱</div>
                            <div>
                                <div className="font-medium text-gray-900">Phone</div>
                                <div className="text-gray-600">+1 (555) 123-4567</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="text-2xl">📍</div>
                            <div>
                                <div className="font-medium text-gray-900">Address</div>
                                <div className="text-gray-600">
                                    123 Frontend Street<br />
                                    Sanity City, SC 12345
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Send us a Message
                    </h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Your message..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
