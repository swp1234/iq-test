/* =================================================================
   IQ Test Questions Database
   50+ copyright-free questions across 5 categories
   ================================================================= */

const QUESTIONS = [
    // ========================
    // Pattern Recognition (10)
    // ========================
    {
        id: 1,
        category: 'pattern',
        categoryLabel: 'Pattern Recognition',
        icon: '🔷',
        difficulty: 1,
        question: 'Which shape comes next?',
        type: 'sequence',
        content: {
            shapes: ['Circle', 'Square', 'Pentagon', 'Hexagon', '?'],
            description: 'Pattern: Number of sides increases by 1'
        },
        options: ['Heptagon (7)', 'Triangle (3)', 'Circle (0)', 'Diamond (4)'],
        correct: 0,
        explanation: 'The pattern increases sides: 0→4→5→6→7. Next is Heptagon with 7 sides.',
        scores: { pattern: 2, sequence: 1, logic: 1, spatial: 0, language: 0 }
    },
    {
        id: 2,
        category: 'pattern',
        categoryLabel: 'Pattern Recognition',
        icon: '🔷',
        difficulty: 2,
        question: 'Find the missing pattern.',
        type: 'grid',
        content: {
            grid: [[2, 4, 8], [3, 6, 12], [5, 10, '?']],
            description: 'Each row: first × 2 = second, second × 2 = third'
        },
        options: ['15', '20', '25', '30'],
        correct: 1,
        explanation: 'Pattern: Left × 2 = Middle, Middle × 2 = Right. So 10 × 2 = 20',
        scores: { pattern: 2, sequence: 1, logic: 1, spatial: 0, language: 0 }
    },
    {
        id: 3,
        category: 'pattern',
        categoryLabel: 'Pattern Recognition',
        icon: '🔷',
        difficulty: 1,
        question: 'What comes next: Red, Blue, Red, Blue, Red, ?',
        type: 'color',
        content: {
            sequence: ['Red', 'Blue', 'Red', 'Blue', 'Red', '?'],
            description: 'Simple alternating pattern'
        },
        options: ['Red', 'Blue', 'Green', 'Yellow'],
        correct: 1,
        explanation: 'The pattern alternates between Red and Blue. The next is Blue.',
        scores: { pattern: 2, sequence: 1, logic: 0, spatial: 0, language: 0 }
    },
    {
        id: 4,
        category: 'pattern',
        categoryLabel: 'Pattern Recognition',
        icon: '🔷',
        difficulty: 2,
        question: 'Complete the sequence: 1, 4, 9, 16, ?',
        type: 'numbers',
        content: {
            sequence: [1, 4, 9, 16, '?'],
            description: 'Square numbers: 1², 2², 3², 4², 5²'
        },
        options: ['20', '25', '28', '32'],
        correct: 1,
        explanation: 'These are perfect squares: 1², 2², 3², 4², 5². The next is 25 (5²).',
        scores: { pattern: 2, sequence: 1, logic: 1, spatial: 0, language: 0 }
    },
    {
        id: 5,
        category: 'pattern',
        categoryLabel: 'Pattern Recognition',
        icon: '🔷',
        difficulty: 2,
        question: 'Find the odd one out: Triangle, Square, Pentagon, Circle, Hexagon',
        type: 'logic',
        content: {
            items: ['Triangle', 'Square', 'Pentagon', 'Circle', 'Hexagon'],
            description: 'One shape breaks the pattern'
        },
        options: ['Triangle', 'Circle', 'Pentagon', 'Hexagon'],
        correct: 1,
        explanation: 'Circle is the odd one - it has no straight sides. All others are polygons.',
        scores: { pattern: 2, sequence: 0, logic: 2, spatial: 1, language: 0 }
    },
    {
        id: 6,
        category: 'pattern',
        categoryLabel: 'Pattern Recognition',
        icon: '🔷',
        difficulty: 3,
        question: 'What number should replace the question mark?',
        type: 'grid',
        content: {
            grid: [[8, 3, 5], [7, 2, 5], [9, 4, '?']],
            description: 'Pattern: First - Second = Third'
        },
        options: ['5', '6', '13', '36'],
        correct: 0,
        explanation: 'Pattern: Left - Middle = Right. So 9 - 4 = 5',
        scores: { pattern: 2, sequence: 1, logic: 1, spatial: 0, language: 0 }
    },
    {
        id: 7,
        category: 'pattern',
        categoryLabel: 'Pattern Recognition',
        icon: '🔷',
        difficulty: 1,
        question: 'Complete: A, B, C, D, ?',
        type: 'letters',
        content: {
            sequence: ['A', 'B', 'C', 'D', '?'],
            description: 'Alphabetical sequence'
        },
        options: ['D', 'E', 'F', 'G'],
        correct: 1,
        explanation: 'Simple alphabetical order: A→B→C→D→E',
        scores: { pattern: 1, sequence: 2, logic: 0, spatial: 0, language: 1 }
    },
    {
        id: 8,
        category: 'pattern',
        categoryLabel: 'Pattern Recognition',
        icon: '🔷',
        difficulty: 2,
        question: 'Find the pattern: 2, 5, 10, 17, ?',
        type: 'numbers',
        content: {
            sequence: [2, 5, 10, 17, '?'],
            description: 'Differences: +3, +5, +7, +9'
        },
        options: ['24', '26', '27', '30'],
        correct: 1,
        explanation: 'Differences increase by 2 each time: +3, +5, +7, +9. So 17 + 9 = 26',
        scores: { pattern: 2, sequence: 1, logic: 1, spatial: 0, language: 0 }
    },
    {
        id: 9,
        category: 'pattern',
        categoryLabel: 'Pattern Recognition',
        icon: '🔷',
        difficulty: 3,
        question: 'What symbol comes next?',
        type: 'symbols',
        content: {
            sequence: ['●', '○', '■', '□', '▲', '?'],
            description: 'Pattern: Filled, Empty, Filled, Empty alternates within shapes'
        },
        options: ['△', '▼', '◆', '●'],
        correct: 0,
        explanation: 'Pattern: Each shape appears filled then empty. Next should be empty triangle (△)',
        scores: { pattern: 2, sequence: 1, logic: 1, spatial: 1, language: 0 }
    },
    {
        id: 10,
        category: 'pattern',
        categoryLabel: 'Pattern Recognition',
        icon: '🔷',
        difficulty: 2,
        question: 'Complete: 64, 32, 16, 8, ?',
        type: 'numbers',
        content: {
            sequence: [64, 32, 16, 8, '?'],
            description: 'Dividing by 2 each time'
        },
        options: ['2', '4', '6', '8'],
        correct: 1,
        explanation: 'Each number is divided by 2: 64÷2=32, 32÷2=16, 16÷2=8, 8÷2=4',
        scores: { pattern: 2, sequence: 1, logic: 1, spatial: 0, language: 0 }
    },

    // ========================
    // Sequence (10)
    // ========================
    {
        id: 11,
        category: 'sequence',
        categoryLabel: 'Sequence Logic',
        icon: '📊',
        difficulty: 1,
        question: 'What is the next number? 3, 6, 9, 12, ?',
        type: 'arithmetic',
        content: {
            sequence: [3, 6, 9, 12, '?'],
            description: 'Multiples of 3'
        },
        options: ['13', '15', '17', '18'],
        correct: 1,
        explanation: 'Each number increases by 3: 3→6→9→12→15',
        scores: { pattern: 0, sequence: 2, logic: 1, spatial: 0, language: 0 }
    },
    {
        id: 12,
        category: 'sequence',
        categoryLabel: 'Sequence Logic',
        icon: '📊',
        difficulty: 2,
        question: 'What should come next? 1, 1, 2, 3, 5, 8, ?',
        type: 'fibonacci',
        content: {
            sequence: [1, 1, 2, 3, 5, 8, '?'],
            description: 'Fibonacci sequence: each number is sum of previous two'
        },
        options: ['10', '12', '13', '16'],
        correct: 2,
        explanation: 'Fibonacci: each number = previous two added. 5+8=13',
        scores: { pattern: 1, sequence: 2, logic: 1, spatial: 0, language: 0 }
    },
    {
        id: 13,
        category: 'sequence',
        categoryLabel: 'Sequence Logic',
        icon: '📊',
        difficulty: 2,
        question: 'Identify the missing number: 2, 3, 5, 7, ?, 13',
        type: 'primes',
        content: {
            sequence: [2, 3, 5, 7, '?', 13],
            description: 'Prime numbers in order'
        },
        options: ['9', '11', '10', '12'],
        correct: 1,
        explanation: 'Prime numbers: 2, 3, 5, 7, 11, 13. The missing number is 11.',
        scores: { pattern: 1, sequence: 2, logic: 1, spatial: 0, language: 0 }
    },
    {
        id: 14,
        category: 'sequence',
        categoryLabel: 'Sequence Logic',
        icon: '📊',
        difficulty: 1,
        question: 'What comes next? 10, 20, 30, 40, ?',
        type: 'arithmetic',
        content: {
            sequence: [10, 20, 30, 40, '?'],
            description: 'Increments of 10'
        },
        options: ['50', '45', '55', '60'],
        correct: 0,
        explanation: 'Each number increases by 10: 10→20→30→40→50',
        scores: { pattern: 0, sequence: 2, logic: 0, spatial: 0, language: 0 }
    },
    {
        id: 15,
        category: 'sequence',
        categoryLabel: 'Sequence Logic',
        icon: '📊',
        difficulty: 3,
        question: 'Find the next: 1, 4, 9, 16, 25, ?',
        type: 'squares',
        content: {
            sequence: [1, 4, 9, 16, 25, '?'],
            description: '1², 2², 3², 4², 5², 6²'
        },
        options: ['30', '36', '42', '49'],
        correct: 1,
        explanation: 'Perfect squares: 1²=1, 2²=4, 3²=9, 4²=16, 5²=25, 6²=36',
        scores: { pattern: 1, sequence: 2, logic: 1, spatial: 0, language: 0 }
    },
    {
        id: 16,
        category: 'sequence',
        categoryLabel: 'Sequence Logic',
        icon: '📊',
        difficulty: 2,
        question: 'Complete: 100, 50, 25, 12.5, ?',
        type: 'geometric',
        content: {
            sequence: [100, 50, 25, 12.5, '?'],
            description: 'Divided by 2 each time'
        },
        options: ['6.25', '6.5', '7', '8'],
        correct: 0,
        explanation: 'Each number is divided by 2: 100÷2=50, 50÷2=25, etc. 12.5÷2=6.25',
        scores: { pattern: 0, sequence: 2, logic: 1, spatial: 0, language: 0 }
    },
    {
        id: 17,
        category: 'sequence',
        categoryLabel: 'Sequence Logic',
        icon: '📊',
        difficulty: 2,
        question: 'What is the missing number? 5, 10, 20, 40, ?',
        type: 'geometric',
        content: {
            sequence: [5, 10, 20, 40, '?'],
            description: 'Each number multiplied by 2'
        },
        options: ['60', '80', '100', '120'],
        correct: 1,
        explanation: 'Each number is doubled: 5×2=10, 10×2=20, 20×2=40, 40×2=80',
        scores: { pattern: 0, sequence: 2, logic: 1, spatial: 0, language: 0 }
    },
    {
        id: 18,
        category: 'sequence',
        categoryLabel: 'Sequence Logic',
        icon: '📊',
        difficulty: 3,
        question: 'Find the next: 1, 2, 4, 7, 11, ?',
        type: 'differences',
        content: {
            sequence: [1, 2, 4, 7, 11, '?'],
            description: 'Differences: +1, +2, +3, +4, +5'
        },
        options: ['15', '16', '17', '18'],
        correct: 1,
        explanation: 'Differences increase by 1 each time: +1, +2, +3, +4, +5. So 11+6=17',
        scores: { pattern: 1, sequence: 2, logic: 1, spatial: 0, language: 0 }
    },
    {
        id: 19,
        category: 'sequence',
        categoryLabel: 'Sequence Logic',
        icon: '📊',
        difficulty: 2,
        question: 'Complete the sequence: A2, B4, C6, D8, ?',
        type: 'mixed',
        content: {
            sequence: ['A2', 'B4', 'C6', 'D8', '?'],
            description: 'Letter progresses alphabetically, number by 2'
        },
        options: ['E10', 'E9', 'F10', 'D10'],
        correct: 0,
        explanation: 'Letters increase (A→B→C→D→E), numbers increase by 2. So E10',
        scores: { pattern: 1, sequence: 2, logic: 1, spatial: 0, language: 1 }
    },
    {
        id: 20,
        category: 'sequence',
        categoryLabel: 'Sequence Logic',
        icon: '📊',
        difficulty: 1,
        question: 'What is the next? 2, 4, 6, 8, ?',
        type: 'arithmetic',
        content: {
            sequence: [2, 4, 6, 8, '?'],
            description: 'Even numbers increasing by 2'
        },
        options: ['9', '10', '12', '14'],
        correct: 1,
        explanation: 'Even numbers: 2→4→6→8→10. Each increases by 2',
        scores: { pattern: 0, sequence: 2, logic: 0, spatial: 0, language: 0 }
    },

    // ========================
    // Logic (10)
    // ========================
    {
        id: 21,
        category: 'logic',
        categoryLabel: 'Logical Reasoning',
        icon: '🧩',
        difficulty: 2,
        question: 'If all dogs are animals, and Fido is a dog, then Fido is:',
        type: 'deduction',
        content: {
            premise1: 'All dogs are animals',
            premise2: 'Fido is a dog',
            conclusion: 'Therefore, Fido is...'
        },
        options: ['a cat', 'an animal', 'a mammal', 'impossible to determine'],
        correct: 1,
        explanation: 'Logical deduction: If all dogs are animals, and Fido is a dog, then Fido must be an animal.',
        scores: { pattern: 0, sequence: 0, logic: 2, spatial: 0, language: 1 }
    },
    {
        id: 22,
        category: 'logic',
        categoryLabel: 'Logical Reasoning',
        icon: '🧩',
        difficulty: 2,
        question: 'John is taller than Mary. Mary is taller than Sue. Who is shortest?',
        type: 'comparison',
        content: {
            statement1: 'John > Mary (height)',
            statement2: 'Mary > Sue (height)',
            question: 'Who is the shortest?'
        },
        options: ['John', 'Mary', 'Sue', 'Cannot determine'],
        correct: 2,
        explanation: 'From the statements: John > Mary > Sue. So Sue is the shortest.',
        scores: { pattern: 0, sequence: 0, logic: 2, spatial: 1, language: 0 }
    },
    {
        id: 23,
        category: 'logic',
        categoryLabel: 'Logical Reasoning',
        icon: '🧩',
        difficulty: 3,
        question: 'Which statement must be true? It\'s raining or it\'s sunny.',
        type: 'logic',
        content: {
            statement: 'It is either raining or sunny (or both)',
            options_desc: 'Select what must be true'
        },
        options: ['It\'s raining', 'It\'s sunny', 'At least one is true', 'Both are true'],
        correct: 2,
        explanation: 'If it\'s raining OR sunny, then at least one condition must be true. We can\'t determine which.',
        scores: { pattern: 0, sequence: 0, logic: 2, spatial: 0, language: 1 }
    },
    {
        id: 24,
        category: 'logic',
        categoryLabel: 'Logical Reasoning',
        icon: '🧩',
        difficulty: 2,
        question: 'If no birds are reptiles, and all penguins are birds, then penguins are:',
        type: 'deduction',
        content: {
            premise1: 'No birds are reptiles',
            premise2: 'All penguins are birds',
            conclusion: 'Penguins are...'
        },
        options: ['reptiles', 'not reptiles', 'both birds and reptiles', 'unknown'],
        correct: 1,
        explanation: 'If no birds are reptiles, and penguins are birds, then penguins are not reptiles.',
        scores: { pattern: 0, sequence: 0, logic: 2, spatial: 0, language: 1 }
    },
    {
        id: 25,
        category: 'logic',
        categoryLabel: 'Logical Reasoning',
        icon: '🧩',
        difficulty: 2,
        question: 'All roses are flowers. Some flowers fade. So:',
        type: 'induction',
        content: {
            statement1: 'All roses are flowers',
            statement2: 'Some flowers fade',
            question: 'What can we conclude?'
        },
        options: ['All roses fade', 'Some roses fade', 'Roses never fade', 'Cannot conclude'],
        correct: 3,
        explanation: 'We know some flowers fade, but can\'t conclude if roses specifically fade. It\'s possible but not certain.',
        scores: { pattern: 0, sequence: 0, logic: 2, spatial: 0, language: 1 }
    },
    {
        id: 26,
        category: 'logic',
        categoryLabel: 'Logical Reasoning',
        icon: '🧩',
        difficulty: 1,
        question: 'If A=B and B=C, then A=C. This is:',
        type: 'principle',
        content: {
            principle: 'The transitive property of equality'
        },
        options: ['Always true', 'Sometimes true', 'Never true', 'Unknown'],
        correct: 0,
        explanation: 'The transitive property states if A=B and B=C, then A=C. This is a fundamental logic rule.',
        scores: { pattern: 0, sequence: 0, logic: 2, spatial: 0, language: 1 }
    },
    {
        id: 27,
        category: 'logic',
        categoryLabel: 'Logical Reasoning',
        icon: '🧩',
        difficulty: 3,
        question: 'Red is hotter than blue. Blue is hotter than green. Green is hotter than:',
        type: 'comparison',
        content: {
            statement: 'Temperature order: Red > Blue > Green > ?'
        },
        options: ['Red', 'Nothing, green is coldest', 'Blue', 'Cannot determine'],
        correct: 1,
        explanation: 'Red > Blue > Green means green is the coldest in this comparison. We can\'t determine what\'s colder than green.',
        scores: { pattern: 0, sequence: 0, logic: 2, spatial: 0, language: 0 }
    },
    {
        id: 28,
        category: 'logic',
        categoryLabel: 'Logical Reasoning',
        icon: '🧩',
        difficulty: 2,
        question: 'Everyone who studies passes. Mark didn\'t study. Therefore:',
        type: 'deduction',
        content: {
            premise1: 'Everyone who studies passes',
            premise2: 'Mark didn\'t study',
            conclusion: 'Mark...'
        },
        options: ['Passed', 'Failed', 'Might have passed or failed', 'Studied hard'],
        correct: 2,
        explanation: 'We know studying ensures passing, but not studying doesn\'t guarantee failure. Mark might still pass.',
        scores: { pattern: 0, sequence: 0, logic: 2, spatial: 0, language: 1 }
    },
    {
        id: 29,
        category: 'logic',
        categoryLabel: 'Logical Reasoning',
        icon: '🧩',
        difficulty: 2,
        question: 'Tom is older than Jerry. Jerry is older than Spike. So:',
        type: 'comparison',
        content: {
            statement: 'Age order: Tom > Jerry > Spike'
        },
        options: ['Tom is oldest', 'Spike is oldest', 'Jerry is oldest', 'All are same age'],
        correct: 0,
        explanation: 'From the comparisons: Tom > Jerry > Spike, so Tom is the oldest.',
        scores: { pattern: 0, sequence: 0, logic: 2, spatial: 0, language: 0 }
    },
    {
        id: 30,
        category: 'logic',
        categoryLabel: 'Logical Reasoning',
        icon: '🧩',
        difficulty: 3,
        question: 'If some birds fly and all birds have wings, then:',
        type: 'logic',
        content: {
            statement1: 'Some birds fly',
            statement2: 'All birds have wings',
            question: 'What must be true?'
        },
        options: ['All birds fly', 'Some non-fliers have wings', 'All flying things have wings', 'Flying requires wings'],
        correct: 1,
        explanation: 'Some birds fly, all birds have wings. Some birds that don\'t fly still have wings.',
        scores: { pattern: 0, sequence: 0, logic: 2, spatial: 0, language: 1 }
    },

    // ========================
    // Spatial Reasoning (10)
    // ========================
    {
        id: 31,
        category: 'spatial',
        categoryLabel: 'Spatial Reasoning',
        icon: '🎯',
        difficulty: 2,
        question: 'If you rotate a square 45 degrees, what shape appears?',
        type: 'rotation',
        content: {
            shape: 'Square',
            rotation: '45 degrees'
        },
        options: ['Diamond/Rhombus', 'Triangle', 'Pentagon', 'Hexagon'],
        correct: 0,
        explanation: 'A square rotated 45° appears as a diamond shape (rotated square/rhombus).',
        scores: { pattern: 0, sequence: 0, logic: 0, spatial: 2, language: 0 }
    },
    {
        id: 32,
        category: 'spatial',
        categoryLabel: 'Spatial Reasoning',
        icon: '🎯',
        difficulty: 2,
        question: 'How many faces does a cube have?',
        type: '3d',
        content: {
            object: 'Cube',
            question: 'Number of faces'
        },
        options: ['4', '6', '8', '12'],
        correct: 1,
        explanation: 'A cube (3D square) has 6 faces (top, bottom, left, right, front, back).',
        scores: { pattern: 0, sequence: 0, logic: 0, spatial: 2, language: 0 }
    },
    {
        id: 33,
        category: 'spatial',
        categoryLabel: 'Spatial Reasoning',
        icon: '🎯',
        difficulty: 2,
        question: 'Mirror image: if you see a shape in a mirror, what do you see?',
        type: 'mirror',
        content: {
            description: 'The shape is reversed left to right'
        },
        options: ['Same shape', 'Inverted vertically', 'Reversed horizontally', 'Rotated'],
        correct: 2,
        explanation: 'Mirror images reverse left and right (horizontal flip), not vertical.',
        scores: { pattern: 0, sequence: 0, logic: 0, spatial: 2, language: 0 }
    },
    {
        id: 34,
        category: 'spatial',
        categoryLabel: 'Spatial Reasoning',
        icon: '🎯',
        difficulty: 3,
        question: 'How many edges does a tetrahedron have?',
        type: '3d',
        content: {
            object: 'Tetrahedron (triangular pyramid)',
            question: 'Number of edges'
        },
        options: ['3', '4', '6', '9'],
        correct: 2,
        explanation: 'A tetrahedron has 4 faces, 4 vertices, and 6 edges.',
        scores: { pattern: 0, sequence: 0, logic: 0, spatial: 2, language: 0 }
    },
    {
        id: 35,
        category: 'spatial',
        categoryLabel: 'Spatial Reasoning',
        icon: '🎯',
        difficulty: 2,
        question: 'North is up. If you turn 90 degrees clockwise, you face:',
        type: 'direction',
        content: {
            initial: 'Facing North',
            rotation: '90° clockwise'
        },
        options: ['East', 'South', 'West', 'North-East'],
        correct: 0,
        explanation: 'From North, turning 90° clockwise leads to East.',
        scores: { pattern: 0, sequence: 0, logic: 0, spatial: 2, language: 0 }
    },
    {
        id: 36,
        category: 'spatial',
        categoryLabel: 'Spatial Reasoning',
        icon: '🎯',
        difficulty: 3,
        question: 'A die unfolded shows which pattern? (Standard die: opposite sides sum to 7)',
        type: '3d',
        content: {
            object: 'Standard six-sided die',
            fact: 'Opposite sides sum to 7 (1-6, 2-5, 3-4)'
        },
        options: ['1 opposite 2', '1 opposite 6', '2 opposite 4', 'Cannot determine'],
        correct: 1,
        explanation: 'On a standard die, 1 is always opposite to 6 (they sum to 7).',
        scores: { pattern: 0, sequence: 0, logic: 1, spatial: 2, language: 0 }
    },
    {
        id: 37,
        category: 'spatial',
        categoryLabel: 'Spatial Reasoning',
        icon: '🎯',
        difficulty: 2,
        question: 'If you fold a flat cross pattern, what 3D shape forms?',
        type: 'folding',
        content: {
            pattern: 'Plus sign/Cross when flat',
            question: 'When folded into 3D'
        },
        options: ['Pyramid', 'Cube (without top)', 'Cylinder', 'Sphere'],
        correct: 1,
        explanation: 'A cross pattern (4 squares + center) folds into an open cube structure.',
        scores: { pattern: 0, sequence: 0, logic: 0, spatial: 2, language: 0 }
    },
    {
        id: 38,
        category: 'spatial',
        categoryLabel: 'Spatial Reasoning',
        icon: '🎯',
        difficulty: 2,
        question: 'What is the next position? Right, Down, Left, Up, ?',
        type: 'direction',
        content: {
            sequence: ['Right', 'Down', 'Left', 'Up', '?'],
            description: 'Clockwise rotation of directions'
        },
        options: ['Right', 'Down', 'Diagonal', 'Up-Right'],
        correct: 0,
        explanation: 'Clockwise from North: Right→Down→Left→Up→Right. The cycle repeats at Right.',
        scores: { pattern: 1, sequence: 0, logic: 0, spatial: 2, language: 0 }
    },
    {
        id: 39,
        category: 'spatial',
        categoryLabel: 'Spatial Reasoning',
        icon: '🎯',
        difficulty: 3,
        question: 'If a triangle is reflected across a vertical axis, what happens?',
        type: 'reflection',
        content: {
            object: 'Triangle',
            operation: 'Vertical axis reflection'
        },
        options: ['Becomes smaller', 'Becomes a mirror image', 'Rotates 180°', 'Becomes inverted'],
        correct: 1,
        explanation: 'Reflecting across a vertical axis creates a left-right mirror image.',
        scores: { pattern: 0, sequence: 0, logic: 0, spatial: 2, language: 0 }
    },
    {
        id: 40,
        category: 'spatial',
        categoryLabel: 'Spatial Reasoning',
        icon: '🎯',
        difficulty: 2,
        question: 'How many vertices does a hexagon have?',
        type: 'geometry',
        content: {
            shape: 'Hexagon (6-sided polygon)',
            question: 'Number of vertices'
        },
        options: ['4', '5', '6', '8'],
        correct: 2,
        explanation: 'A hexagon has 6 sides and 6 vertices (corner points).',
        scores: { pattern: 0, sequence: 0, logic: 0, spatial: 2, language: 0 }
    },

    // ========================
    // Language & Verbal (10)
    // ========================
    {
        id: 41,
        category: 'language',
        categoryLabel: 'Verbal Logic',
        icon: '📝',
        difficulty: 1,
        question: 'Complete the analogy: Cat is to meow as dog is to:',
        type: 'analogy',
        content: {
            analogy: 'Cat : meow :: Dog : ?'
        },
        options: ['Purr', 'Bark', 'Hiss', 'Chirp'],
        correct: 1,
        explanation: 'A cat meows, so a dog barks. Both are the typical sounds these animals make.',
        scores: { pattern: 0, sequence: 0, logic: 1, spatial: 0, language: 2 }
    },
    {
        id: 42,
        category: 'language',
        categoryLabel: 'Verbal Logic',
        icon: '📝',
        difficulty: 2,
        question: 'Which word is different? Paint, Run, Happy, Quick',
        type: 'classification',
        content: {
            words: ['Paint', 'Run', 'Happy', 'Quick']
        },
        options: ['Paint', 'Run', 'Happy', 'Quick'],
        correct: 2,
        explanation: 'Happy is an adjective. Paint, Run are verbs. Quick is also an adjective, but Happy describes feeling while Quick describes speed.',
        scores: { pattern: 0, sequence: 0, logic: 0, spatial: 0, language: 2 }
    },
    {
        id: 43,
        category: 'language',
        categoryLabel: 'Verbal Logic',
        icon: '📝',
        difficulty: 2,
        question: 'Which is a synonym for "commence"?',
        type: 'vocabulary',
        content: {
            word: 'Commence'
        },
        options: ['End', 'Begin', 'Finish', 'Delay'],
        correct: 1,
        explanation: '"Commence" means to begin or start something.',
        scores: { pattern: 0, sequence: 0, logic: 0, spatial: 0, language: 2 }
    },
    {
        id: 44,
        category: 'language',
        categoryLabel: 'Verbal Logic',
        icon: '📝',
        difficulty: 2,
        question: 'Wheel is to car as wing is to:',
        type: 'analogy',
        content: {
            analogy: 'Wheel : Car :: Wing : ?'
        },
        options: ['Feather', 'Bird', 'Sky', 'Engine'],
        correct: 1,
        explanation: 'A wheel is a part of a car; a wing is a part of a bird.',
        scores: { pattern: 0, sequence: 0, logic: 1, spatial: 0, language: 2 }
    },
    {
        id: 45,
        category: 'language',
        categoryLabel: 'Verbal Logic',
        icon: '📝',
        difficulty: 3,
        question: 'Which word does NOT belong? Carpet, Blanket, Rope, Curtain',
        type: 'classification',
        content: {
            words: ['Carpet', 'Blanket', 'Rope', 'Curtain']
        },
        options: ['Carpet', 'Blanket', 'Rope', 'Curtain'],
        correct: 2,
        explanation: 'Rope is typically made from twisted fibers. The others are flat fabric items used in homes.',
        scores: { pattern: 0, sequence: 0, logic: 1, spatial: 0, language: 2 }
    },
    {
        id: 46,
        category: 'language',
        categoryLabel: 'Verbal Logic',
        icon: '📝',
        difficulty: 1,
        question: 'Which is an antonym for "large"?',
        type: 'vocabulary',
        content: {
            word: 'Large'
        },
        options: ['Huge', 'Tiny', 'Enormous', 'Vast'],
        correct: 1,
        explanation: '"Tiny" is the opposite of "large" in size.',
        scores: { pattern: 0, sequence: 0, logic: 0, spatial: 0, language: 2 }
    },
    {
        id: 47,
        category: 'language',
        categoryLabel: 'Verbal Logic',
        icon: '📝',
        difficulty: 2,
        question: 'Author is to book as composer is to:',
        type: 'analogy',
        content: {
            analogy: 'Author : Book :: Composer : ?'
        },
        options: ['Painting', 'Music', 'Sculpture', 'Film'],
        correct: 1,
        explanation: 'An author writes a book; a composer writes music.',
        scores: { pattern: 0, sequence: 0, logic: 1, spatial: 0, language: 2 }
    },
    {
        id: 48,
        category: 'language',
        categoryLabel: 'Verbal Logic',
        icon: '📝',
        difficulty: 2,
        question: 'Choose the correct sentence:',
        type: 'grammar',
        content: {
            sentences: ['He go to school', 'He goes to school', 'He going to school', 'He gone to school']
        },
        options: ['He go to school', 'He goes to school', 'He going to school', 'He gone to school'],
        correct: 1,
        explanation: 'The present tense for third person singular requires "goes" not "go".',
        scores: { pattern: 0, sequence: 0, logic: 0, spatial: 0, language: 2 }
    },
    {
        id: 49,
        category: 'language',
        categoryLabel: 'Verbal Logic',
        icon: '📝',
        difficulty: 1,
        question: 'Doctor is to hospital as teacher is to:',
        type: 'analogy',
        content: {
            analogy: 'Doctor : Hospital :: Teacher : ?'
        },
        options: ['House', 'School', 'Office', 'Library'],
        correct: 1,
        explanation: 'A doctor works in a hospital; a teacher works in a school.',
        scores: { pattern: 0, sequence: 0, logic: 1, spatial: 0, language: 2 }
    },
    {
        id: 50,
        category: 'language',
        categoryLabel: 'Verbal Logic',
        icon: '📝',
        difficulty: 2,
        question: 'Which word best completes: "A silent ___ can speak volumes."',
        type: 'completion',
        content: {
            sentence: 'A silent ___ can speak volumes.'
        },
        options: ['Scream', 'Stare', 'Moment', 'Gesture'],
        correct: 3,
        explanation: 'A "silent gesture" (like a nod or wave) can convey meaning without words.',
        scores: { pattern: 0, sequence: 0, logic: 0, spatial: 0, language: 2 }
    }
];

// Function to get random questions for test
function getRandomQuestions(count = 20) {
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to get questions by category
function getQuestionsByCategory(category, count = 4) {
    const categoryQuestions = QUESTIONS.filter(q => q.category === category);
    const shuffled = [...categoryQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, categoryQuestions.length));
}

// Function to calculate IQ from score
function calculateIQ(score, totalQuestions = 20, timeBonus = 0) {
    // Base IQ: 100 = 50% correct, 85-145 range
    const percentCorrect = (score / totalQuestions) * 100;

    // IQ formula: 100 + (percentCorrect - 50) * 0.9
    let baseIQ = 100 + ((percentCorrect - 50) * 0.9);

    // Add time bonus (bonus for answering quickly)
    baseIQ = baseIQ + (timeBonus * 0.1);

    // Clamp to 85-145 range
    return Math.max(85, Math.min(145, Math.round(baseIQ)));
}

// Function to get grade from IQ
function getGradeInfo(iq) {
    if (iq >= 130) {
        return { grade: '천재', label: 'Genius', percent: 2, color: '#ff6b6b' };
    } else if (iq >= 120) {
        return { grade: '우수', label: 'Superior', percent: 10, color: '#4ecdc4' };
    } else if (iq >= 110) {
        return { grade: '평균상', label: 'High Average', percent: 25, color: '#ffe66d' };
    } else if (iq >= 90) {
        return { grade: '평균', label: 'Average', percent: 50, color: '#95e1d3' };
    } else if (iq >= 80) {
        return { grade: '노력필요', label: 'Below Average', percent: 75, color: '#c7b3e5' };
    } else {
        return { grade: '특화교육필요', label: 'Needs Improvement', percent: 90, color: '#d4a574' };
    }
}
