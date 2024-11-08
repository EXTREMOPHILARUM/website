import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const HighlightCard = ({ highlight, index }) => {
  return (
    <motion.div
      variants={item}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="block text-4xl font-bold text-primary mb-2">
              {highlight.number}
            </span>
            <span className="text-sm text-muted-foreground">
              {highlight.label}
            </span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HighlightCard;
