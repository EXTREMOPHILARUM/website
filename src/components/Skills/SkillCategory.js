import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

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

const SkillCategory = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{category.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.ul
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {category.skills.map((skill, skillIndex) => (
              <motion.li
                key={skillIndex}
                variants={item}
                className="flex items-center space-x-3 group"
              >
                <span className="text-xl text-primary group-hover:text-primary/80 transition-colors">
                  {skill.icon}
                </span>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {skill.name}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkillCategory;
