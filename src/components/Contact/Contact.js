import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Contact = () => {
  const contactLinks = [
    {
      href: "https://github.com/EXTREMOPHILARUM",
      label: "GitHub",
      icon: <Github className="mr-2 h-4 w-4" />
    },
    {
      href: "https://linkedin.com/in/extremophilarum",
      label: "LinkedIn",
      icon: <Linkedin className="mr-2 h-4 w-4" />
    },
    {
      href: "mailto:me@saurabhn.com",
      label: "Email",
      icon: <Mail className="mr-2 h-4 w-4" />
    },
    {
      href: "tel:+919892356631",
      label: "Phone",
      icon: <Phone className="mr-2 h-4 w-4" />
    }
  ];

  return (
    <section id="contact" className="py-16 px-4 md:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold tracking-tight mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h2>
        
        <Card>
          <CardContent className="p-6">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-8"
            >
              <motion.p 
                variants={item}
                className="text-lg text-muted-foreground text-center"
              >
                I'm always interested in hearing about new projects and opportunities.
                Whether you have a question or just want to say hi, feel free to reach out!
              </motion.p>

              <motion.div 
                variants={container}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {contactLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <a 
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        {link.icon}
                        {link.label}
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
