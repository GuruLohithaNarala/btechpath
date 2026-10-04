import React, { useState } from "react";
import { BookOpen, Search, ChevronDown, Video, FileText, Code } from "lucide-react";

export default function LearningHub() {
  const [selectedCategory, setSelectedCategory] = useState("Programming");
  const [expandedLanguage, setExpandedLanguage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // All Learning Resources Database
  const LEARNING_RESOURCES = {
    "Programming": {
      "Python": {
        icon: "🐍",
        color: "from-blue-600 to-blue-400",
        description: "Versatile, beginner-friendly language for data science, web, and AI",
        youtube: [
          { title: "Python Complete Beginner Tutorial - Corey Schafer", url: "https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU" }
        ],
        pdf: [
          { title: "Python Complete Guide - GeeksforGeeks", url: "https://www.geeksforgeeks.org/python-programming-language/" },
          { title: "Python Official Documentation", url: "https://docs.python.org/3/" },
          { title: "Python for Data Analysis - Pandas Guide", url: "https://pandas.pydata.org/docs/" }
        ]
      },
      "JavaScript": {
        icon: "⚡",
        color: "from-yellow-600 to-yellow-400",
        description: "Essential for web development, DOM manipulation, and modern web apps",
        youtube: [
          { title: "JavaScript Complete Course ", url: "https://youtu.be/PlbupGCBV6w?si=I6WqK44A6pydvn4q" }
        ],
        pdf: [
          { title: "JavaScript MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
          { title: "You Don't Know JS Yet - Kyle Simpson", url: "https://github.com/getify/You-Dont-Know-JS" },
          { title: "JavaScript.info - Complete Interactive Guide", url: "https://javascript.info/" }
        ]
      },
      "Java": {
        icon: "☕",
        color: "from-orange-600 to-orange-400",
        description: "Strong typing, OOP foundation for enterprise and Android development",
        youtube: [
          { title: "Java Complete Beginner Course", url: "https://youtu.be/BGTx91t8q50?si=19lub7ANsMeYgtuW" },
          
        ],
        pdf: [
          { title: "Java Official Documentation", url: "https://docs.oracle.com/javase/" },
        ]
      },
      "C++": {
        icon: "⚙️",
        color: "from-blue-700 to-cyan-500",
        description: "High-performance language for systems, competitive programming, and game dev",
        youtube: [
          { title: "C++ Complete Course", url: "https://youtu.be/-TkoO8Z07hI?si=mkiDdAqq9-C0LhWj" }
         
        ],
       
      },
      "React": {
        icon: "⚛️",
        color: "from-cyan-600 to-cyan-400",
        description: "Modern JavaScript library for building interactive user interfaces",
        youtube: [
         
          { title: "React Hooks Tutorial - Traversy Media", url: "https://www.youtube.com/watch?v=f687hBjwFcM" },
          
        ],
        pdf: [
          { title: "React Official Documentation", url: "https://react.dev/" },
          
          { title: "Advanced React Patterns - Kent C. Dodds", url: "https://epicreact.dev/" }
        ]
      },
      "SQL": {
        icon: "🗄️",
        color: "from-indigo-600 to-indigo-400",
        description: "Essential database query language for data retrieval and manipulation",
        youtube: [
          { title: "SQL Tutorial - Traversy Media", url: "https://www.youtube.com/watch?v=9Pzj7Aj25lw" },
         
        ],
        pdf: [
          { title: "SQL Complete Reference - Oracle", url: "https://docs.oracle.com/en/database/oracle/oracle-database/" },
          { title: "SQL Performance Tuning Guide", url: "https://use-the-index-luke.com/" },
          { title: "SQL Cheat Sheet - Mode Analytics", url: "https://mode.com/sql-tutorial/" }
        ]
      },
      "C": {
        icon: "🔧",
        color: "from-gray-600 to-gray-400",
        description: "Foundational language for understanding computer architecture and systems",
        youtube: [
          { title: "C Programming - Bro Code", url: "https://www.youtube.com/watch?v=KJgsSFOSQv0" }
          
        ],
        pdf: [
          
          { title: "The C Programming Language - K&R", url: "https://en.wikipedia.org/wiki/The_C_Programming_Language" },
          { title: "C Pointers & Memory Management", url: "https://www.geeksforgeeks.org/c-programming-language/" }
        ]
      },
      "TypeScript": {
        icon: "📘",
        color: "from-blue-700 to-blue-500",
        description: "Superset of JavaScript with static typing for larger applications",
        youtube: [
          { title: "TypeScript Complete Course ", url: "https://youtu.be/MOtsUWz_4-Q?si=p0OkIoMDGAQmVYEg" },

        ],
        pdf: [
          { title: "TypeScript Official Documentation", url: "https://www.typescriptlang.org/docs/" },
          { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/" },
          { title: "Advanced TypeScript Types", url: "https://www.totaltypescript.com/" }
        ]
      }
    },
    "DSA": {
      "Arrays & Strings": {
        icon: "📊",
        color: "from-emerald-600 to-emerald-400",
        description: "Master array manipulation, string processing, and common patterns",
        youtube: [
          { title: "DSA Array Tutorial - Aditya Verma", url: "https://youtu.be/iZmDcfTtcNg?si=i0vd1hr6ZNn_16ds" },
          
        ],
        pdf: [
          { title: "LeetCode Array Cheatsheet", url: "https://leetcode.com/explore/featured/card/fun-with-arrays" },
          { title: "GeeksforGeeks Array Guide", url: "https://www.geeksforgeeks.org/array-data-structure/" }
          
        ]
      },
      "Trees & Graphs": {
        icon: "🌳",
        color: "from-green-600 to-green-400",
        description: "Binary trees, BSTs, graphs, DFS, BFS, and tree traversals",
        youtube: [
          { title: "Trees Complete Tutorial", url: "https://youtu.be/YAdLFsTG70w?si=4A6h85dINJpmdPds" }
          
        ],
        pdf: [
          { title: "Binary Tree Problems - LeetCode", url: "https://leetcode.com/explore/featured/card/binary-tree" },
          { title: "Graph Data Structures - GeeksforGeeks", url: "https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/" }
          
        ]
      },

      "Sorting & Searching": {
        icon: "🔍",
        color: "from-orange-600 to-orange-400",
        description: "Sorting algorithms, binary search, and search patterns",
        youtube: [
          { title: "Sorting Algorithms Explained - Aditya Verma", url: "https://youtu.be/C46QfTjVCNU?si=VlCyX5nt-FBJhv12_" }
    
        ],
        pdf: [
          { title: "Sorting Algorithm Analysis", url: "https://www.geeksforgeeks.org/sorting-algorithms/" },
          { title: "Binary Search Guide", url: "https://www.geeksforgeeks.org/binary-search/" },
          { title: "Search Optimization Techniques", url: "https://www.geeksforgeeks.org/searching-algorithms/" }
        ]
      }
    },
    "DBMS": {
      "Relational Databases": {
        icon: "🗃️",
        color: "from-blue-600 to-blue-400",
        description: "Database design, normalization, ACID properties, and schema design",
        youtube: [
          { title: "DBMS Fundamentals", url: "https://youtu.be/T7AxM7Vqvaw?si=F3kcYIMT6jtbwDVd_" }
          
        ],
        pdf: [
          
          { title: "Normalization Guide - GeeksforGeeks", url: "https://www.geeksforgeeks.org/normal-forms-in-dbms/" },
          { title: "ACID Properties Explained", url: "https://www.geeksforgeeks.org/acid-properties-in-dbms/" }
        ]
      },
      "SQL Advanced": {
        icon: "⚙️",
        color: "from-indigo-600 to-indigo-400",
        description: "Joins, subqueries, indexes, transactions, and optimization",
        youtube: [
          
          { title: "SQL Optimization Techniques", url: "https://youtu.be/MpczBuIk7R8?si=9d70xmUfzrf_v79P" },
          
        ],
        pdf: [
          { title: "SQL Joins Explained - Mode Analytics", url: "https://mode.com/sql-tutorial/sql-joins/" }
          
        ]
      },
      "NoSQL Databases": {
        icon: "📈",
        color: "from-red-600 to-red-400",
        description: "MongoDB, Redis, DynamoDB, document stores, and key-value databases",
        youtube: [
          { title: "MongoDB Complete Course - Traversy Media", url: "https://www.youtube.com/watch?v=-56x56UppqQ" },
          { title: "Redis Tutorial - Programming with Mosh", url: "https://www.youtube.com/watch?v=OqCK95AS-YE" },
          { title: "NoSQL Databases Explained - IBM", url: "https://www.youtube.com/watch?v=xQnIN9bW0og" }
        ],
        pdf: [
          { title: "MongoDB Documentation", url: "https://docs.mongodb.com/" },
          { title: "Redis Data Structures", url: "https://redis.io/docs/" }
          
        ]
      }
    },
    "Web Development": {
      "Frontend": {
        icon: "🎨",
        color: "from-pink-600 to-pink-400",
        description: "HTML, CSS, JavaScript, responsive design, and modern frameworks",
        youtube: [
          
          { title: "Responsive Web Design - freeCodeCamp", url: "https://www.youtube.com/watch?v=srvUrASNj0s" }
        ],
        pdf: [
          { title: "HTML & CSS Reference - MDN", url: "https://developer.mozilla.org/en-US/docs/Web/Guide" },
          
          { title: "Web Design Patterns", url: "https://www.patterns.dev/" }
        ]
      },
      "Backend": {
        icon: "⚙️",
        color: "from-green-600 to-green-400",
        description: "Node.js, Express, APIs, authentication, and database integration",
        youtube: [
          
          { title: "Backend API Development", url: "https://youtu.be/1oTuMPIwHmk?si=J9C6ThhxXF7d89JQ" },
          
        ],
        pdf: [
          { title: "Node.js Documentation", url: "https://nodejs.org/en/docs/" },
          { title: "Express.js Guide", url: "https://expressjs.com/" },
          
        ]
      },
      "Full Stack": {
        icon: "🚀",
        color: "from-purple-600 to-purple-400",
        description: "MERN stack, full application development, and deployment",
        youtube: [
          { title: "Full Stack MERN", url: "https://youtu.be/CvCiNeLnZ00?si=eAbLHFWzLnt7JLmk" },
          
        ],
        pdf: [
          { title: "MERN Stack Tutorial", url: "https://www.geeksforgeeks.org/mern-stack/" },
          
        ]
      }
    },
    "AI/ML": {
      "Machine Learning": {
        icon: "🤖",
        color: "from-cyan-600 to-cyan-400",
        description: "Supervised learning, classification, regression, and scikit-learn",
        youtube: [
          { title: "Machine Learning - ", url: "https://youtu.be/QTVCTIeE3gA?si=XX9_7QeM59-idqnL" },
    
        ],
        pdf: [
          { title: "Machine Learning from Scratch", url: "https://www.geeksforgeeks.org/machine-learning/" },
          { title: "Scikit-learn Documentation", url: "https://scikit-learn.org/stable/documentation.html" },
          { title: "ML Algorithms Comprehensive Guide", url: "https://www.geeksforgeeks.org/machine-learning-algorithms/" }
        ]
      },
      "Deep Learning": {
        icon: "🧠",
        color: "from-blue-600 to-blue-400",
        description: "Neural networks, CNNs, RNNs, TensorFlow, and PyTorch",
        youtube: [
          { title: "Deep Learning - Fast.ai", url: "https://youtu.be/VsjhpUuOKn0?si=kxYC11mFpnpV1sou" }
        ],
        pdf: [
          { title: "TensorFlow Documentation", url: "https://www.tensorflow.org/guide" },
          { title: "PyTorch Tutorials", url: "https://pytorch.org/tutorials/" }
          
        ]
      },
      "NLP & CV": {
        icon: "👁️",
        color: "from-orange-600 to-orange-400",
        description: "Natural Language Processing, Computer Vision, transformers, and BERT",
        youtube: [
          { title: "NLP", url: "https://youtu.be/s5zuplW8ua8?si=JPb0fEn600RJy7Rl" },
          { title: "Computer Vision ", url: "https://youtu.be/3LaVxEX3F0o?si=zBGMTiBEg3_19GHl" },
          
        ],
        pdf: [
          { title: "Hugging Face Transformers", url: "https://huggingface.co/docs/transformers/" },
          { title: "OpenCV Guide", url: "https://docs.opencv.org/" },
          
        ]
      }
    },
  }

  const PROGRAMMING_RESOURCES = LEARNING_RESOURCES["Programming"];

  const CATEGORIES = ["Programming", "DSA", "DBMS", "Web Development", "AI/ML"];

  const filteredResources = Object.entries(selectedCategory === "Programming" ? PROGRAMMING_RESOURCES : LEARNING_RESOURCES[selectedCategory] || {}).filter(([item]) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Complete Learning Resources</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Master <span className="gradient-text">{selectedCategory}</span>
        </h1>
        <p className="text-slate-400 text-sm">
          Curated video tutorials, comprehensive guides, and learning materials for every topic.
        </p>
      </div>

      {/* Category Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchTerm("");
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-glow"
                  : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar - For all categories */}
        <div className="relative pt-2 border-t border-slate-800">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-8" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${selectedCategory.toLowerCase()} topics...`}
            className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

{/* Resources Grid */}
      <div className="space-y-4">
        <p className="text-sm text-slate-400">Found {filteredResources.length} {selectedCategory.toLowerCase()} topics</p>
        
        <div className="grid grid-cols-1 gap-4">
          {filteredResources.map(([itemName, data]) => (
            <div key={itemName} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition-all">
              
              {/* Header - Clickable to expand */}
              <button
                onClick={() => setExpandedLanguage(expandedLanguage === itemName ? null : itemName)}
                className="w-full"
              >
                <div className={`bg-gradient-to-r ${data.color} p-6 sm:p-8 flex items-center justify-between group`}>
                  <div className="flex items-center space-x-4 text-left">
                    <span className="text-4xl">{data.icon}</span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{itemName}</h3>
                      <p className="text-sm text-white/80 mt-1">{data.description}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-white transition-transform ${
                      expandedLanguage === itemName ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Expanded Content */}
              {expandedLanguage === itemName && (
                <div className="p-6 sm:p-8 space-y-8 border-t border-slate-800 bg-slate-950/50">
                  
                  {/* Tutorial/Course Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Video className="w-5 h-5 text-red-500" />
                      <h4 className="text-lg font-bold text-white">Video Tutorials & Courses</h4>
                    </div>
                    <div className="space-y-3">
                      {data.youtube.map((video, idx) => (
                        <a
                          key={idx}
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-slate-900 border border-slate-700 rounded-2xl hover:border-red-500/50 hover:bg-slate-800/80 transition-all group"
                        >
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                              <Video className="w-5 h-5 text-red-500" />
                            </div>
                            <span className="text-sm text-slate-300 group-hover:text-white truncate">{video.title}</span>
                          </div>
                          <ChevronDown className="w-5 h-5 text-slate-500 rotate-180 ml-2 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Guide/Documentation Section */}
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <h4 className="text-lg font-bold text-white">Guides, Documentation & Notes</h4>
                    </div>
                    <div className="space-y-3">
                      {data.pdf.map((guide, idx) => (
                        <a
                          key={idx}
                          href={guide.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-slate-900 border border-slate-700 rounded-2xl hover:border-blue-500/50 hover:bg-slate-800/80 transition-all group"
                        >
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-5 h-5 text-blue-500" />
                            </div>
                            <span className="text-sm text-slate-300 group-hover:text-white truncate">{guide.title}</span>
                          </div>
                          <ChevronDown className="w-5 h-5 text-slate-500 rotate-180 ml-2 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <Code className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No results found for "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
