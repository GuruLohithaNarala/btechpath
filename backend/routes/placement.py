from flask import Blueprint, request, jsonify

placement_bp = Blueprint("placement", __name__, url_prefix="/api/placement")

PLACEMENT_DATA = {
    "dsa_modules": [
        {"id": "dsa_arrays", "title": "Arrays & Strings", "total_problems": 25, "completed": 12, "difficulty": "Easy to Medium", "key_topics": ["Two Pointers", "Sliding Window", "Prefix Sum"]},
        {"id": "dsa_ll", "title": "Linked Lists", "total_problems": 15, "completed": 8, "difficulty": "Medium", "key_topics": ["Reversal", "Cycle Detection (Floyd's)", "Merge K Lists"]},
        {"id": "dsa_stack", "title": "Stack & Queue", "total_problems": 15, "completed": 6, "difficulty": "Medium", "key_topics": ["Monotonic Stack", "Next Greater Element", "LRU Cache"]},
        {"id": "dsa_trees", "title": "Binary Trees & BST", "total_problems": 20, "completed": 5, "difficulty": "Medium to Hard", "key_topics": ["Traversals (In/Pre/Post)", "LCA", "Diameter of Tree"]},
        {"id": "dsa_graphs", "title": "Graphs", "total_problems": 18, "completed": 2, "difficulty": "Hard", "key_topics": ["BFS", "DFS", "Dijkstra's Algorithm", "Topological Sort"]}
    ],
    "core_cs": [
        {"id": "dbms", "subject": "DBMS", "topics_count": 12, "key_concepts": ["ACID Properties", "Normalization (1NF-3NF/BCNF)", "Indexing (B+ Trees)", "Transactions & Locking"]},
        {"id": "os", "subject": "Operating Systems", "topics_count": 10, "key_concepts": ["Process vs Thread", "Deadlock Prevention", "Virtual Memory & Paging", "CPU Scheduling"]},
        {"id": "cn", "subject": "Computer Networks", "topics_count": 10, "key_concepts": ["TCP 3-Way Handshake", "OSI 7 Layers", "HTTP vs HTTPS", "DNS Resolution"]},
        {"id": "oop", "subject": "OOP Concepts", "topics_count": 8, "key_concepts": ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism (Overloading vs Overriding)"]}
    ],
    "aptitude": [
        {"id": "quant", "category": "Quantitative Aptitude", "topics": ["Percentages", "Profit & Loss", "Time & Work", "Probability", "Speed & Distance"]},
        {"id": "logical", "category": "Logical Reasoning", "topics": ["Blood Relations", "Coding-Decoding", "Syllogism", "Seating Arrangement"]},
        {"id": "verbal", "category": "Verbal Ability", "topics": ["Reading Comprehension", "Sentence Correction", "Synonyms & Antonyms", "Para Jumbles"]}
    ],
    "government_jobs": [
        {"id": "upsc-ese", "title": "Engineering Services Examination (ESE)", "sector": "Central Government", "roles": "Group A and Group B engineering roles across central government departments.", "eligibility": "An engineering degree in a discipline listed in the current UPSC notification; age and other conditions vary by notice.", "selection": "Typically Engineering Services Preliminary Examination, Main Examination, and Personality Test.", "preparation": "Build depth in your engineering discipline, then practice objective questions, descriptive answers, and the General Studies and Engineering Aptitude paper.", "official_url": "https://upsc.gov.in/", "official_label": "UPSC official site"},
        {"id": "upsc-cse", "title": "Civil Services Examination", "sector": "Central Government", "roles": "Administrative and public-service roles such as IAS, IPS, and other services allocated through the examination.", "eligibility": "A recognized bachelor's degree; age, attempt limits, category relaxations, and service-specific rules are set by the current notice.", "selection": "Preliminary Examination, Main Examination, and Personality Test.", "preparation": "Follow the current syllabus, build consistent general-studies and optional-subject practice, and use timed mock tests with answer review.", "official_url": "https://upsc.gov.in/", "official_label": "UPSC official site"},
        {"id": "isro-scientist", "title": "ISRO Scientist/Engineer", "sector": "Central Government", "roles": "Engineering and research roles supporting India's space programmes.", "eligibility": "Relevant engineering degree and minimum academic criteria specified for the discipline in the current ISRO recruitment notice.", "selection": "May include a written test and interview; the process is specific to each recruitment notice.", "preparation": "Revise core engineering subjects, solve discipline-specific questions, and prepare to explain projects and technical decisions.", "official_url": "https://www.isro.gov.in/Careers.html", "official_label": "ISRO careers"},
        {"id": "drdo-scientist", "title": "DRDO Scientist 'B'", "sector": "Central Government", "roles": "Research and development roles in defence laboratories.", "eligibility": "Relevant engineering or science degree; GATE score, discipline, marks, and other criteria depend on the current RAC advertisement.", "selection": "Shortlisting and further assessment, commonly including an interview; follow the active RAC notice for the exact process.", "preparation": "Strengthen core technical subjects, understand your GATE fundamentals, and practice explaining project work and research interests.", "official_url": "https://rac.gov.in/", "official_label": "DRDO RAC recruitment"},
        {"id": "psu-engineer", "title": "PSU Graduate Engineer / Trainee", "sector": "Public Sector Undertaking", "roles": "Engineering roles at participating public sector companies; openings and disciplines differ by organization.", "eligibility": "A relevant engineering degree and, where specified, a valid GATE score from the accepted year and paper; each PSU sets its own criteria.", "selection": "May use GATE shortlisting followed by interview, group discussion, or other assessments specified by the PSU.", "preparation": "Prepare for GATE in your discipline, track individual PSU notices, and compare accepted GATE years, branches, and eligibility before applying.", "official_url": "https://www.powergrid.in/job-opportunities", "official_label": "Example PSU: POWERGRID jobs"},
        {"id": "nic-scientist", "title": "NIC Scientist / Technical Posts", "sector": "Central Government", "roles": "IT, software, networking, and digital-governance roles when advertised by the National Informatics Centre.", "eligibility": "Required degree, specialization, experience, and recruitment route are defined in each NIC notice.", "selection": "The notice may specify a written examination, GATE-based shortlisting, interview, or a combination.", "preparation": "Review computer science fundamentals, programming, networks, databases, and the exact syllabus in the active advertisement.", "official_url": "https://www.nic.in/recruitment/", "official_label": "NIC recruitment"},
        {"id": "ssc-cgl", "title": "SSC Combined Graduate Level (CGL)", "sector": "Central Government", "roles": "Graduate-level central government posts, including assistant, inspector, and auditor roles as notified.", "eligibility": "A bachelor's degree for most posts; some posts have additional subject, physical, or other requirements.", "selection": "Computer-based examination tiers and any post-specific stages listed in the current SSC notice.", "preparation": "Practice quantitative aptitude, reasoning, English, and general awareness with timed section tests; verify post preferences and criteria in the notice.", "official_url": "https://ssc.gov.in/", "official_label": "SSC official site"},
        {"id": "rrb-je", "title": "Railway Recruitment Board Junior Engineer", "sector": "Railways", "roles": "Technical roles in railway departments, with disciplines and vacancies varying by notification.", "eligibility": "A relevant engineering diploma or degree as specified for the post in the current CEN notification.", "selection": "Typically computer-based test stages and document verification; post-specific medical standards may apply.", "preparation": "Study the notified technical syllabus alongside mathematics, reasoning, and general awareness; use only your regional RRB's active notice for dates and criteria.", "official_url": "https://www.rrbcdg.gov.in/", "official_label": "Example regional RRB site"},
        {"id": "state-psc-engineer", "title": "State PSC Engineering Posts", "sector": "State Government", "roles": "Assistant Engineer, Junior Engineer, and other technical posts in state departments when advertised.", "eligibility": "Degree or diploma in the relevant discipline, domicile or language conditions, and age criteria depend on the state and post.", "selection": "State-specific written examinations and any interview, document verification, or other stages in the official notification.", "preparation": "Check your state's Public Service Commission and department notices; prepare technical subjects, state-specific general knowledge, and any required local language.", "official_url": "", "official_label": "Check your state PSC portal"},
        {"id": "ibps-po", "title": "IBPS Probationary Officer", "sector": "Public Sector Banking", "roles": "Officer-entry roles at participating public sector banks through the IBPS recruitment process.", "eligibility": "A bachelor's degree and other age, nationality, and document criteria specified in the current notification.", "selection": "Commonly preliminary and main examinations followed by an interview; follow the current notification for the exact stages.", "preparation": "Practice quantitative aptitude, reasoning, English, and banking awareness; build speed and accuracy through timed mocks.", "official_url": "https://www.ibps.in/", "official_label": "IBPS official site"},
        {"id": "sbi-po", "title": "SBI Probationary Officer", "sector": "Public Sector Banking", "roles": "Officer-entry roles at State Bank of India.", "eligibility": "A bachelor's degree and the age, nationality, and other conditions in the active SBI careers notice.", "selection": "SBI-specific examination stages and interview or group exercises as described in the current advertisement.", "preparation": "Prepare aptitude, reasoning, English, and banking awareness; review SBI's own exam pattern and practice timed mock tests.", "official_url": "https://sbi.co.in/web/careers/current-openings", "official_label": "SBI current openings"}
    ],
    "interview_qa": [
        {"q": "Explain the difference between Process and Thread.", "subject": "OS", "a": "A process is an independent executing program with its own memory space. A thread is a lightweight unit of execution within a process that shares memory with other threads in the same process."},
        {"q": "What are ACID properties in DBMS?", "subject": "DBMS", "a": "Atomicity (all or nothing), Consistency (preserves database rules), Isolation (concurrent transactions don't interfere), Durability (committed changes persist)."},
        {"q": "Tell me about yourself and your B.Tech final year project.", "subject": "HR / Tech", "a": "Structure using STAR method: Situation, Task, Action taken, Result achieved. Highlight key tech stack, your specific role, and measurable outcomes."},
        {"q": "What is database normalization, and why is it useful?", "subject": "DBMS", "a": "Normalization organizes related data into tables to reduce duplication and update anomalies. Common normal forms progressively require atomic values, removal of partial dependencies, and removal of transitive dependencies."},
        {"q": "What is the difference between an index and a primary key?", "subject": "DBMS", "a": "A primary key is a constraint that uniquely identifies each row and cannot be null. An index is a data structure that speeds up lookups; primary keys are commonly backed by a unique index, but indexes can also be non-unique."},
        {"q": "When would you use a LEFT JOIN instead of an INNER JOIN?", "subject": "DBMS", "a": "Use INNER JOIN when you only need rows with matches on both sides. Use LEFT JOIN when every row from the left table must remain, including rows with no match on the right, whose columns are returned as NULL."},
        {"q": "What conditions are required for a deadlock?", "subject": "OS", "a": "Deadlock requires mutual exclusion, hold-and-wait, no preemption, and circular wait. Breaking at least one condition can prevent deadlock; prevention and avoidance are different strategies."},
        {"q": "How does virtual memory work?", "subject": "OS", "a": "Virtual memory gives each process a private address space. The operating system and memory-management hardware translate virtual addresses to physical frames; pages not currently in RAM can be loaded from storage when needed."},
        {"q": "What is a context switch, and what does it cost?", "subject": "OS", "a": "A context switch saves one task's CPU state and restores another's so the CPU can change work. It enables multitasking but adds overhead from saving state, scheduling, and possible cache or translation-lookaside-buffer disruption."},
        {"q": "How does TCP differ from UDP?", "subject": "Computer Networks", "a": "TCP provides a connection-oriented, ordered byte stream with acknowledgements and retransmission. UDP sends independent datagrams without those delivery guarantees, making it lower overhead for applications that handle timing or recovery themselves."},
        {"q": "What happens during a TLS handshake?", "subject": "Computer Networks", "a": "The client and server negotiate cryptographic settings, the server proves its identity with a certificate, and both sides establish shared session keys. Subsequent application data is encrypted and integrity-protected."},
        {"q": "What does DNS do when you open a website?", "subject": "Computer Networks", "a": "DNS resolves a domain name to records such as an IP address. A resolver checks caches and, if needed, queries the DNS hierarchy; the result is cached for its TTL before the browser connects to the server."},
        {"q": "How are abstraction and encapsulation different?", "subject": "OOP", "a": "Abstraction exposes essential behavior while hiding implementation detail. Encapsulation bundles state with operations and controls access to that state, helping preserve invariants."},
        {"q": "What is the difference between method overloading and overriding?", "subject": "OOP", "a": "Overloading uses the same method name with different parameter lists, typically resolved at compile time. Overriding replaces an inherited method implementation with a compatible one, enabling runtime polymorphism."},
        {"q": "When would you choose composition over inheritance?", "subject": "OOP", "a": "Choose composition when a class should use another object's behavior without claiming an is-a relationship. It often reduces tight coupling and lets behavior be changed by swapping collaborators."},
        {"q": "What is the average time complexity of lookup in a hash table, and when can it degrade?", "subject": "DSA", "a": "Lookup is average O(1) with a suitable hash function and controlled load factor. It can degrade toward O(n) when many keys collide; resizing and collision handling help manage this."},
        {"q": "When is binary search applicable?", "subject": "DSA", "a": "Binary search applies when the search space has a monotonic condition, such as a sorted array or a yes/no predicate that changes only once. Each step halves the remaining range, giving O(log n) checks."},
        {"q": "How do BFS and DFS differ, and when is each useful?", "subject": "DSA", "a": "BFS explores level by level using a queue and finds shortest paths in unweighted graphs. DFS explores deeply using recursion or a stack and is useful for reachability, cycle detection, and topological-order algorithms."},
        {"q": "How do lists and tuples differ in Python?", "subject": "Python", "a": "Lists are mutable sequences, while tuples are immutable sequences. Use a list for values that change; use a tuple for fixed records or values that should not be reassigned, noting that a tuple can still contain mutable objects."},
        {"q": "Why are mutable default arguments risky in Python?", "subject": "Python", "a": "Default argument objects are created once when the function is defined and reused across calls. A list or dictionary default can therefore retain changes; use None and create a fresh object inside the function."},
        {"q": "What is the Python GIL, and when might it matter?", "subject": "Python", "a": "In standard CPython builds, the Global Interpreter Lock allows only one thread at a time to execute Python bytecode in a process. Threads can still help with I/O-bound work; CPU-bound parallel work often uses processes or native code that releases the GIL."},
        {"q": "How do you handle a disagreement within a project team?", "subject": "HR", "a": "Explain the shared goal, how you listened to the other view, and how you compared options using evidence or constraints. Finish with the agreed decision and what you learned, without blaming teammates."},
        {"q": "What is one strength you would bring to this role?", "subject": "HR", "a": "Choose a strength relevant to the role, then support it with a specific example and outcome. Keep the example concise and explain how the strength would help you contribute to this team."},
        {"q": "Why are you interested in this role?", "subject": "HR", "a": "Connect a concrete part of the role to your skills and interests, mention relevant work or projects, and explain what you hope to contribute. Avoid relying only on generic claims about the company."},
        {"q": "Why should we hire you?", "subject": "HR", "a": "Match two or three requirements from the role to evidence from your coursework, projects, internship, or teamwork. Close with how you would apply those strengths while continuing to learn."},
        {"q": "What is one area you are working to improve?", "subject": "HR", "a": "Choose a genuine, manageable development area that is not essential to the role. Explain the concrete steps you are taking and how you measure progress; avoid disguising a strength as a weakness."},
        {"q": "Describe a challenge or setback and how you handled it.", "subject": "HR", "a": "Use STAR: briefly explain the situation and your responsibility, focus on the actions you personally took, and share the outcome and lesson. Be honest about what you would do differently."},
        {"q": "Tell me about a time you took initiative.", "subject": "HR", "a": "Describe a need you noticed, how you checked that action was appropriate, what you did, and the result. Use a specific example from a class, team, club, internship, or personal project."},
        {"q": "How do you prioritize when several deadlines overlap?", "subject": "HR", "a": "Compare urgency, impact, and dependencies, break work into milestones, and communicate risks early. Give an example of how you adjusted the plan when priorities changed."},
        {"q": "How do you respond to constructive feedback?", "subject": "HR", "a": "Listen without interrupting, ask clarifying questions, and agree on an observable next step. Share a real example of applying feedback and what improved afterward."},
        {"q": "Describe a time you worked with someone whose approach differed from yours.", "subject": "HR", "a": "Explain the difference neutrally, how you aligned on the shared outcome, and how you adapted communication or divided the work. End with the result and what you learned about collaboration."},
        {"q": "What motivates you when work becomes repetitive or difficult?", "subject": "HR", "a": "Name a practical source of motivation, such as progress toward a goal, solving a user problem, or improving a process. Support it with a brief example and avoid claiming that motivation never drops."},
        {"q": "Where would you like to grow over the next few years?", "subject": "HR", "a": "Describe skills and responsibilities you want to develop that align with the role. Keep the goal realistic and emphasize learning and contribution rather than a guaranteed title or promotion."},
        {"q": "Tell me about a mistake you made and what you learned.", "subject": "HR", "a": "Choose a real, appropriately scoped mistake. Take responsibility, explain how you corrected or communicated it, and describe the process change you made to reduce the chance of recurrence."},
        {"q": "How would you handle a task when the requirements are unclear?", "subject": "HR", "a": "Clarify the desired outcome, constraints, and success criteria with the relevant people. State any assumptions, propose a small next step, and confirm alignment before investing heavily in the wrong solution."},
        {"q": "What kind of team environment helps you do your best work?", "subject": "HR", "a": "Describe specific working habits that help you contribute, such as clear ownership, respectful feedback, or focused collaboration. Also explain how you adapt when a team works differently."},
        {"q": "Do you have any questions for us?", "subject": "HR", "a": "Ask one or two thoughtful questions about the role's first priorities, how the team collaborates, or how success is evaluated. Avoid asking for information already clearly provided during the interview."},
        {
            "q": "Given a list of integers and a target, return the indices of two values that add up to the target.",
            "subject": "Coding Interview",
            "a": "Store previously seen values and their indices in a hash map. For each value, look for its complement before storing it. Expected time is O(n), with O(n) extra space.",
            "code": "def two_sum(nums, target):\n    seen = {}\n    for index, value in enumerate(nums):\n        complement = target - value\n        if complement in seen:\n            return [seen[complement], index]\n        seen[value] = index\n    return []"
        },
        {
            "q": "Check whether a string is a palindrome, ignoring spaces, punctuation, and letter case.",
            "subject": "Coding Interview",
            "a": "Compare normalized characters from both ends, moving inward. This uses O(n) time and O(n) space for the normalized string; a character-filtering two-pointer version can use O(1) extra space.",
            "code": "def is_palindrome(text):\n    left, right = 0, len(text) - 1\n    while left < right:\n        while left < right and not text[left].isalnum():\n            left += 1\n        while left < right and not text[right].isalnum():\n            right -= 1\n        if text[left].lower() != text[right].lower():\n            return False\n        left += 1\n        right -= 1\n    return True"
        },
        {
            "q": "Given a string containing brackets, determine whether every opening bracket is closed in the correct order.",
            "subject": "Coding Interview",
            "a": "Use a stack for opening brackets and match each closing bracket with the most recent opener. The algorithm takes O(n) time and O(n) space.",
            "code": "def is_valid_brackets(text):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n    for char in text:\n        if char in pairs.values():\n            stack.append(char)\n        elif char in pairs:\n            if not stack or stack.pop() != pairs[char]:\n                return False\n    return not stack"
        },
        {
            "q": "Implement binary search to find a target in a sorted list; return -1 if it is absent.",
            "subject": "Coding Interview",
            "a": "Maintain an inclusive search interval and discard half after each comparison. The time complexity is O(log n), with O(1) extra space.",
            "code": "def binary_search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        middle = (left + right) // 2\n        if nums[middle] == target:\n            return middle\n        if nums[middle] < target:\n            left = middle + 1\n        else:\n            right = middle - 1\n    return -1"
        },
        {
            "q": "Find the largest sum of any non-empty contiguous subarray.",
            "subject": "Coding Interview",
            "a": "Kadane's algorithm tracks the best subarray ending at the current position and the best seen overall. It takes O(n) time and O(1) extra space.",
            "code": "def max_subarray_sum(nums):\n    if not nums:\n        raise ValueError('nums must not be empty')\n    current = best = nums[0]\n    for value in nums[1:]:\n        current = max(value, current + value)\n        best = max(best, current)\n    return best"
        },
        {
            "q": "Merge a list of possibly overlapping intervals.",
            "subject": "Coding Interview",
            "a": "Sort intervals by start, then either extend the last merged interval or append a new one. Sorting dominates at O(n log n); the merged output uses O(n) space.",
            "code": "def merge_intervals(intervals):\n    merged = []\n    for start, end in sorted(intervals):\n        if not merged or start > merged[-1][1]:\n            merged.append([start, end])\n        else:\n            merged[-1][1] = max(merged[-1][1], end)\n    return merged"
        },
        {
            "q": "Group a list of words so that anagrams appear in the same group.",
            "subject": "Coding Interview",
            "a": "Use each word's sorted characters as a canonical dictionary key. Sorting each word gives O(n k log k) time for n words of maximum length k, plus output storage.",
            "code": "from collections import defaultdict\n\ndef group_anagrams(words):\n    groups = defaultdict(list)\n    for word in words:\n        key = tuple(sorted(word))\n        groups[key].append(word)\n    return list(groups.values())"
        },
        {
            "q": "Find the length of the longest substring that contains no repeated characters.",
            "subject": "Coding Interview",
            "a": "Use a sliding window and remember each character's latest index. Move the left boundary past a repeated character when it lies in the current window. This takes O(n) time and O(k) space for k distinct characters.",
            "code": "def longest_unique_substring(text):\n    last_seen = {}\n    left = best = 0\n    for right, char in enumerate(text):\n        if char in last_seen and last_seen[char] >= left:\n            left = last_seen[char] + 1\n        last_seen[char] = right\n        best = max(best, right - left + 1)\n    return best"
        },
        {
            "q": "Return the index of the first non-repeating character in a string, or -1 if none exists.",
            "subject": "Coding Interview",
            "a": "Count characters in one pass, then scan the string in order for a count of one. The algorithm takes O(n) time and O(k) space for k distinct characters.",
            "code": "from collections import Counter\n\ndef first_unique_index(text):\n    counts = Counter(text)\n    for index, char in enumerate(text):\n        if counts[char] == 1:\n            return index\n    return -1"
        },
        {
            "q": "Given an unweighted graph, find the fewest edges from a start node to a target node.",
            "subject": "Coding Interview",
            "a": "Run breadth-first search with a queue and mark nodes when they are enqueued. BFS visits nodes in increasing distance, taking O(V + E) time and O(V) space.",
            "code": "from collections import deque\n\ndef shortest_path_length(graph, start, target):\n    queue = deque([(start, 0)])\n    visited = {start}\n    while queue:\n        node, distance = queue.popleft()\n        if node == target:\n            return distance\n        for neighbor in graph.get(node, []):\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append((neighbor, distance + 1))\n    return -1"
        }
    ]
}

@placement_bp.route("", methods=["GET"])
def get_placement_modules():
    return jsonify(PLACEMENT_DATA), 200
