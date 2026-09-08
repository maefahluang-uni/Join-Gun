\# บะหมี่หมูแดง888 — Legal & Compliance Rules for AI Agents  
\# JoinGun — Legal & Compliance Rules (rule.md)

Read this before writing any code that touches user data or user actions.

\#\# PDPA (Personal Data Protection Act)

\*\*What it is:\*\* Thailand's privacy law governing how personal and sensitive data is collected, stored, processed, and deleted.

\*\*What it requires:\*\* consent · purpose limit · minimise · access/correct/delete · sensitive data

\*\*Rules for the agent (write as many as you can):\*\*

\- If the system collects \*\*location data\*\* (GPS pin, activity meeting location) or \*\*activity participation history\*\*, it must get a separate, clear opt-in consent before collecting or using that data.

\- If the system stores \*\*user profile data\*\* (e.g., name, student year, university email, interests), it must encrypt data at rest and keep location/activity history stored separately from direct personal identifiers.

\- If a user selects "Delete My Account & Data", the system must permanently delete or make their past activity history, location logs, and friend connections unidentifiable within the required retention period.

\- If a user requests a copy of their data through "Download My Data", the system must generate a secure, password-protected file (JSON or CSV) containing their personal data and activity/participation history.

\- If the AI recommendation model requires data for training or fine-tuning, the system must not send raw identifiable data, real names, or unnecessary personal information to external LLMs or third-party APIs — identifiers must be removed first.

\- If a data field is not necessary for posting/joining activities or generating recommendations (e.g., national ID, home address, religion), the agent must not collect or include it in forms, API payloads, or database schemas.

\- If the system verifies identity via university email, it must not retain the email in plaintext alongside activity history longer than necessary for verification and account recovery purposes.

\#\# Computer Crime Act (Computer-related Crime Act)

\*\*What it is:\*\* Thai cybercrime legislation requiring computer service providers to retain relevant computer traffic data for accountability, security investigations, and legal purposes.

\*\*What it requires:\*\* keep an access/traffic log ≥ 90 days, tied to a real user

\*\*Rules for the agent:\*\*

\- If a user posts an activity, joins/leaves an activity, or sends/accepts a friend request, the system must write a log entry with \`user\_id\`, the exact timestamp, \`ip\_address\`, and the action type.

\- If a user clicks "I Agree" to Terms of Service, the Privacy Policy, or AI-recommendation consent, the system must create a secure record with \`user\_id\`, the exact timestamp, \`ip\_address\`, and the specific \`terms\_version\` accepted by the user.

\- If the Terms of Service, AI disclaimers, consent terms, or data-processing policies are materially updated, the system must require the user to review and accept the updated version when renewed acceptance is required.

\- If the AI recommendation system provides activity suggestions, the system must clearly communicate relevant limitations and disclaimers, and record the user's acknowledgement where required.

\- If an activity host approves or confirms a participant electronically, the system must keep a reliable record showing who approved it, and it must not be possible to alter that record afterward.

\- If a user logs in, logs out, or requests an API access token, the system must write a log entry with \`user\_id\`, timestamp (UTC/ISO-8601), \`source\_ip\`, and \`auth\_status\`.

\- If a user deletes their account or requests full profile erasure, the system must mark the profile as deleted for user-facing features but archive the record for at least 90 days after termination.

\- If a user reports or blocks another user, the system must retain the report record (reporter, reported user, reason, timestamp) for at least 90 days for safety-investigation purposes.

\#\# Electronic Transactions Act — Ethical AI Guidance

\*\*What it is:\*\* Ethical guidance for responsible AI development, focusing on transparency, fairness, explainability, accountability, privacy, and human oversight.

\*\*What it requires:\*\* valid e-signature test · presumed-reliable signature · certification-authority-style duties for consent records

\*\*Rules for the agent:\*\*

\- If the AI generates an activity recommendation or "match score," the system must display the main factors contributing to it (e.g., shared interests, past participation, proximity) in a way that users can understand.

\- If an activity involves meeting a stranger, the system must provide clear safety guidance and must not represent the AI matching or university-email verification as a guarantee of the other person's identity, intentions, or safety.

\- If a user believes an AI-generated recommendation does not reflect their actual interests, the system must provide a mechanism for the user to give feedback on or override/dismiss the recommendation.

\- If the recommendation model is trained, tested, or updated, the system must evaluate the dataset and model outputs for potential bias or unfair treatment across relevant user groups (e.g., by year, faculty, gender).

\- If an AI-generated recommendation may significantly influence a user's decision (e.g., who to meet, where to go, which activity to join), the system must clearly indicate that the recommendation was generated by AI and provide an appropriate method for human review.

\- If a user's account is verified, suspended, or flagged based on an automated process, the system must provide a way for the user to request human review of that decision.

\#\# Legal Requirements — Compliance and safety regulations

\- LR1 (Consent & PDPA): The system must provide a separate, clear opt-in consent prompt before collecting GPS location data and activity participation history.

\- LR2 (Data Erasure): When a user deletes their account, the system must permanently delete their profile data or anonymize their activity history within the legally required retention period.

\- LR3 (Traffic Log): The system must retain an access/traffic log (e.g., IP address, login time, activity posting, and joining actions) tied to the user ID for at least 90 days, compliant with the Computer-related Crime Act.

\- LR4 (AI Transparency): If the feed displays AI-recommended activities, the system must clearly indicate that it is an AI recommendation and explain the main factors contributing to it.

\- LR5 (Data Minimization): Unnecessary personal data (e.g., National ID, home address) must not be collected or stored in the database, and all personal identifiers must be removed before using data to train AI models.