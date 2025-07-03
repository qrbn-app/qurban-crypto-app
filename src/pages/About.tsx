
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IslamicPattern } from "@/components/IslamicPattern";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 font-inter">
      <IslamicPattern />
      
      {/* Hero Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About qrbn.app
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Bridging sacred traditions with modern technology through blockchain innovation
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                qrbn.app exists to make the sacred tradition of qurban accessible to Muslims worldwide, 
                regardless of their location or circumstances. By leveraging blockchain technology, 
                we ensure complete transparency, trust, and authenticity in every transaction.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform connects believers globally with verified qurban animals, enabling them 
                to fulfill their religious obligations with confidence and receive permanent proof 
                of their contribution through NFT certificates.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-6xl text-center mb-4">🌙</div>
              <h3 className="text-xl font-semibold text-center text-gray-900 mb-3">
                Faith Meets Technology
              </h3>
              <p className="text-gray-600 text-center">
                Preserving Islamic traditions while embracing the benefits of Web3 innovation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative z-10 py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🛡️</span>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Transparency
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Every transaction is recorded on-chain, providing complete visibility 
                  into how funds are used and animals are selected and sacrificed.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🤝</span>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Trust
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  We work only with verified local partners who ensure animals meet 
                  Islamic requirements and are handled according to proper procedures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🌍</span>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Accessibility
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Making qurban participation possible for Muslims anywhere in the world, 
                  using familiar payment methods and modern technology.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">📜</span>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Authenticity
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Maintaining the spiritual essence and religious requirements of qurban 
                  while providing modern conveniences and global access.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🔒</span>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Using blockchain technology to ensure secure transactions and 
                  permanent, tamper-proof records of all qurban contributions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">💚</span>
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Building a global community of believers who can share in the 
                  sacred tradition of qurban, regardless of geographical boundaries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How qrbn.app Works</h2>
            <p className="text-lg text-gray-600">
              A simple, transparent process from selection to sacrifice
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Animal</h3>
              <p className="text-gray-600">
                Choose from verified qurban animals across different locations
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Make Payment</h3>
              <p className="text-gray-600">
                Pay securely using USDC or other supported cryptocurrencies
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Receive Certificate</h3>
              <p className="text-gray-600">
                Get your NFT certificate as permanent proof of contribution
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-primary font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">View Results</h3>
              <p className="text-gray-600">
                Receive photos and documentation of the completed qurban
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
