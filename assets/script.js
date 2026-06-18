const romanticLines = [
            "In a room full of art, I'd still stare at you.",
            "Some hearts just understand each other, even in silence.",
            "You are my favorite distraction.",
            "Every iteration of my world centers around you.",
            "With you, time stands perfectly still."
        ];

        let lineIndex = 0;
        const quoteElement = document.getElementById('quote-element');

        function cycleQuotes() {
            quoteElement.classList.remove('visible');
            setTimeout(() => {
                quoteElement.textContent = romanticLines[lineIndex];
                quoteElement.classList.add('visible');
                lineIndex = (lineIndex + 1) % romanticLines.length;
            }, 800);
        }

        cycleQuotes();
        setInterval(cycleQuotes, 4000);

        // SILENT BACKGROUND SUBMISSION HANDLING
        async function handleOpinionSubmit(event) {
            event.preventDefault(); // Prevents normal browser form redirection behavior
            
            const form = document.getElementById('opinion-form');
            const submitBtn = document.getElementById('submit-btn');
            const textInput = document.getElementById('opinion-input').value.trim();
            
            if(textInput === "") return;

            // Instantly transition the screen to Step 2 so the user experiences zero delay or loading lag
            document.getElementById('step-1').classList.remove('active');
            setTimeout(() => {
                document.getElementById('step-2').classList.add('active');
            }, 300);

            // Construct form object data silently in cache memory
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            // Execute asynchronous HTTP request to server pipeline in the background
            try {
                await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                });
                // Execution completed silently. Email arrives in your inbox.
            } catch (error) {
                // Fail silently in backend to avoid breaking interface experience
                console.log("Background synchronization paused.");
            }
        }

        // Trigger Fullscreen Popups based on button selection
        function showFinalResult(choice) {
            if (choice === 'yes') {
                document.getElementById('popup-yes').classList.add('show');
            } else if (choice === 'no') {
                document.getElementById('popup-no').classList.add('show');
            }
        }