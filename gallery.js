/**
 * Gallery — continuous 3D A3 poster carousel
 * Spin → settle → focus (poster + meta + explanations).
 */
(function () {
    'use strict';

    const POSTERS = [
        {
            src: "Images/gallery/01-tangorra.jpg",
            title: "Average corporate proposal be like",
            titleLines: [
                "AVERAGE <span class=\"sups\">SUPER IMPORTANT</span>",
                "CORPORATE PROPOSAL",
                "BE LIKE"
            ],
            authors: "Costantini, Carlino, Tangorra, Tiveron, Antonelli",
            explanations: [
                {
                    kind: "description",
                    en: "The poster humorously critiques the working reality of emerging graphic designers using the Mr. Incredible meme. The title introduces a descending scale of job offers: starting with the dream of a well-paid contract, slipping into an unpaid internship, and ending with the surreal proposition of becoming a PowerPoint expert. A sarcastic portrayal of the often unmet expectations in the design world.",
                    it: "Il manifesto ironizza sulla realtà lavorativa dei graphic designer emergenti usando il meme di Mr. Incredible. Il titolo introduce una scala discendente di offerte lavorative: si parte con il sogno di un contratto ben retribuito, si scivola in uno stage non pagato e si conclude con la proposta surreale di diventare un esperto di PowerPoint. Un ritratto sarcastico delle aspettative spesso disattese nel mondo del design."
                },
                {
                    kind: "contribution",
                    author: "A. C. 〔MA DESIGN〕",
                    en: "Starting with the question we were asked about our level of preparation for entering the working world, it is significant to emphasise that almost all of the students are aware that they have deficits in their preparation and that they do not feel totally ready and prepared for the professional world. This insecurity may partly be due to actual technical deficiencies, but in most cases it is purely a result of not having experienced stimulating and complete work in the specific sector. The student should, however, be able to integrate and learn some knowledge outside the university context, expanding their technical skills as well as their critical and judging abilities.",
                    it: "Partendo dalla domanda che ci è stata posta riguardo il nostro livello di preparazione per l'inserimento nel mondo del lavoro, è significativo sottolineare come quasi la totalità degli studenti e delle studentesse siano consapevoli di avere delle carenze nella propria preparazione e che non si sentono totalmente pronti e pronte per il mondo professionale. Questa insicurezza può essere in parte derivata da effettive lacune di tipo tecnico, ma nella maggior parte dei casi sono unicamente dettate dal fatto di non avere avuto esperienze di lavoro stimolanti e complete nello specifico settore. Lo studente o la studentessa dovranno comunque essere in grado di integrare e apprendere alcune conoscenze fuori dal contesto universitario, ampliando il loro bagaglio di competenze tecniche, nonché le capacità critiche e di giudizio."
                },
                {
                    kind: "contribution",
                    author: "D. C. 〔MA DESIGN〕",
                    en: "Memes, thanks to their immediacy and viral spreading ability, are a powerful tool for raising awareness on social and political issues. Through irony and sarcasm, they manage to address complex topics or serious problems in an accessible way. Their strength lies in making readable and shareable often ignored issues, such as contradictions in the job market, social injustices, or the absurdity of certain dynamics. Memes that deal with the professional world, humorously denounce concrete situations such as precariousness, unpaid jobs and the undervaluing of skills, then stimulate deeper reflections. This critique also reflects my concerns in the field of design: the gap between theory and practice, dealing with real challenges, and the risk of being undervalued. To face the work environment with confidence, practical experience, the ability to value oneself, and an understanding of the business side of design are essential.",
                    it: "I meme, grazie alla loro immediatezza e capacità di diffusione virale, rappresentano uno strumento potente per sensibilizzare su temi sociali e politici. Attraverso l'ironia e il sarcasmo, riescono a trattare argomenti complessi o problematiche gravi in modo accessibile. La loro forza sta nel rendere leggibili e condivisibili questioni spesso ignorate, come le contraddizioni del mondo del lavoro, le ingiustizie sociali o l'assurdità di certe dinamiche. I meme che trattano il mondo professionale, denunciano con umorismo situazioni concrete come la precarietà, i lavori non pagati e la scarsa valorizzazione delle competenze, stimolano poi riflessioni più profonde. Questa critica riflette anche le mie preoccupazioni nel campo del design: il divario tra teoria e pratica, la gestione delle sfide reali e il rischio di essere sottovalutat3. Per affrontare il lavoro con sicurezza, serve esperienza pratica, capacità di valorizzarsi e una comprensione del lato commerciale del design."
                },
                {
                    kind: "contribution",
                    author: "F. T. 〔MA DESIGN〕",
                    en: "During the workshop several very interesting topics emerged, such as the fair recognition of people who dedicate their time and work without being adequately compensated by academic institutions, the uncertainty about the preparation of a young designer freshly graduated from university, and the importance and media power of memes in social contexts. Personally, I don't feel entirely ready to face the design job market: I fear I lack some practical skills, such as managing complex projects or communicating effectively with clients and teams. I am also concerned about competing in a challenging market where the value of design risks being underestimated. I believe I need to work on building confidence and quickly adapting to new contexts, while seizing every opportunity to refine my practical skills.",
                    it: "Durante il workshop sono emersi diversi argomenti molto interessanti, come la giusta considerazione delle persone che mettono a disposizione il proprio tempo e lavoro senza essere adeguatamente retribuite dagli enti universitari, l'incertezza della preparazione di un giovane designer appena uscito dall'università e l'importanza e la potenza mediatica dei meme nei contesti sociali. Personalmente, non mi sento del tutto pronto ad affrontare il mondo del lavoro nel design: temo di mancare di alcune competenze prettamente pratiche, come la gestione di progetti complessi o la comunicazione con clienti e team. Mi preoccupa anche il confronto con un mercato competitivo, dove il valore del design rischia di essere sottovalutato. Credo di dover lavorare sulla fiducia in me stesso e sulla capacità di adattarmi rapidamente, sfruttando ogni opportunità per affinare le competenze pratiche."
                },
                {
                    kind: "contribution",
                    author: "T. T. 〔MA DESIGN〕",
                    en: "Personally, I am convinced that there is a time and place for every stage of life. I believe I am ready to conclude my studies and embark on a new journey. I have already experienced various work environments, but I am aware that new challenges and obstacles, which may put me in serious difficulty, lie ahead. Honestly, I think this is normal and natural. I am certainly concerned about my future stability, but we only live once, and I know I have people around me ready to support me during tough times. The most frightening aspects are the fear of not being good enough or the fear of not being able to support myself. However, I am fairly certain that we are all on a journey of continuous growth. In the grand scheme of things, my potential future mistakes don't scare me that much.",
                    it: "Personalmente sono convinta che ci sia un luogo e un momento per ogni fase della propria vita. Penso di essere pronta a concludere il mio percorso di studi ed iniziarne uno nuovo: ho già vissuto vari ambienti lavorativi, ma sono consapevole che mi si presenteranno di fronte nuove sfide da superare e ostacoli che potranno mettermi in seria difficoltà. Sinceramente penso sia normale e naturale, sono certamente in pensiero per la mia stabilità futura, ma la vita è una e so che ho delle persone vicino pronte a sostenermi in momenti di difficoltà. Gli elementi più spaventosi sono la paura di non essere all'altezza o la paura di non riuscire a sostentarmi da sola, ma sono abbastanza sicura che stiamo tutt@ vivendo un viaggio nel quale si è in continua evoluzione. Nel grande schema delle cose, gli eventuali miei errori futuri non mi spaventano più di tanto."
                },
                {
                    kind: "contribution",
                    author: "T. A. 〔MA DESIGN〕",
                    en: "I found the classroom discussion to be very stimulating and interesting. Especially Claudia Doms' talk about the feedback collected from the students on the perception of design teaching in academia and the differences with the world of work. I really appreciated the comparison with my own experience: I found similarities with my academic experience in many of the feedbacks that made up the publication “221 Complaints”. However, I believe that it is very complex for a university to replicate some of the business dynamics, which are also variable depending on the work reality in which one fits. At the same time I still find the working world and academia too far apart.",
                    it: "Trovo che la discussione in aula sia stata molto stimolante e interessante. In particolar modo l'intervento di Claudia Doms in merito ai feedback raccolti dallx studentx sulla percezione dell'insegnamento del design in ambito accademico e sulle differenze con il mondo del lavoro. Ho trovato analogie con la mia esperienza accademica in molti dei feedback che hanno costituito la pubblicazione “221 Complaints”. Ritengo tuttavia che sia molto complesso per un'università replicare alcune dinamiche aziendali, che sono anche variabili a seconda della realtà lavorativa in cui ci si inserisce. Allo stesso tempo trovo ancora troppo distanti il mondo lavorativo e quello accademico."
                }
            ]
        },
        {
            src: "Images/gallery/02-melega.jpg",
            title: "Good pay no sleep",
            titleLines: [
                "GOOD PAY NO SLEEP"
            ],
            authors: "Melega",
            explanations: [
                {
                    kind: "description",
                    en: "Older design studios, while having the highest budgets, are often less cutting edge. It seems that, in this field, we have to choose between being ambitious and poor, or following the pace of ancient graphic design, giving up some of our personal growth in order to get higher fees. Critical design is emblematic of this conflict: improve the quality of thinking or adapt to the uncritical mode of most studios?",
                    it: "Gli studi di design più vecchi, pur avendo i budget più alti, sono spesso meno all'avanguardia. Sembra che, in questo settore, dobbiamo scegliere tra essere ambiziosi e poveri, oppure seguire il ritmo della grafica antica, rinunciando in parte alla crescita personale pur di ottenere compensi maggiori. Il design critico è l'emblema di questo conflitto: migliorare la qualità del pensiero o adattarsi alla modalità acritica della maggior parte degli studi?"
                },
                {
                    kind: "contribution",
                    author: "V. M. 〔MA DESIGN〕",
                    en: "When I look at the projects completed in college, I realize the freedoms I will no longer be able to afford in the working world. I realize that I will face economic pressures and tight deadlines that will limit my creativity. At what price must I sell myself to live in the balance between working well paid uncritically, simulating projects I have already seen, or living by critical thinking without compromise? In this age of the simulacrum, our generation's attempt should be to avoid copying and value the new. We live in a world where images and ideas are constantly being reproduced and recycled, often losing their original meaning. As young designers, we have a responsibility to break this cycle, to seek new forms of expression and to propose innovative solutions that go beyond mere imitation.",
                    it: "Quando osservo i progetti realizzati all'interno dell'università, mi rendo conto delle libertà che non potrò più permettermi nel mondo del lavoro. Mi rendo conto che dovrò affrontare pressioni economiche e scadenze stringenti che limiteranno la mia creatività. A che prezzo devo vendere me stessa per vivere in equilibrio tra lavoro ben pagato in modo acritico, simulando progetti già visti, o vivere di pensiero critico senza compromessi? In quest'epoca del simulacro, il tentativo della nostra generazione dovrebbe essere quello di evitare la copia e valorizzare il nuovo. Viviamo in un mondo dove le immagini e le idee vengono continuamente riprodotte e riciclate, perdendo spesso il loro significato originale. Come giovani designer, abbiamo la responsabilità di rompere questo ciclo, di cercare nuove forme di espressione e di proporre soluzioni innovative che vadano oltre la mera imitazione."
                }
            ]
        },
        {
            src: "Images/gallery/03-andreetta.jpg",
            title: "Me applying",
            titleLines: [
                "ME APPLYING <span class=\"sups\">TO AN</span>",
                "UPPER-DEGREE",
                "DESIGN COURSE"
            ],
            authors: "Andreetta, Giraudo, Mandara, Monti",
            explanations: [
                {
                    kind: "description",
                    en: "Our manifesto takes shape from a reflection on the umbrella term “design”, understood as a container of elements in sharp ethical and political contrast. As designers, we are asked to be increasingly “environmentalists” -while being aware that any form of production involves an environmental impact- and at the same time “inclusive”, two realities that often struggle to find a balance. Our outputs therefore seek to embrace these different facets, translating and narrating them through the language of the meme.",
                    it: "Il nostro manifesto prende forma a partire dalla riflessione sul termine ombrello “design”, inteso come contenitore di elementi in forte contrasto etico e politico. Come progettist*, ci viene richiesto di essere sempre più “ambientalist*” - pur sapendo che qualsiasi forma di produzione comporta un impatto ambientalee al contempo “inclusiv*”, due realtà che spesso faticano a trovare un equilibrio. I nostri output cercano quindi di abbracciare queste diverse sfaccettature, traducendole e raccontandole attraverso il linguaggio del meme."
                },
                {
                    kind: "contribution",
                    author: "P. A. 〔MA DESIGN〕",
                    en: "Before addressing the question posed at the beginning of the meeting, I'd like to pause for a moment on a statement by Noam Youngrak Son, which more or less says: “designers are transformed into machines that create meaning to things”. I fully agree with Noam's observation and recognize how this can carry a double meaning. In fact, by “creating” meaning, we are no longer commodifying objects of primary necessity but rather fetish items, which inherently carry characteristics of social identification and belonging rather than the more obvious and direct practical use. This phenomenon undoubtedly has negative aspects: as already thoroughly analyzed by Marx and Baudrillard, it amplifies the capitalist system of compulsive consumption. However, it can also foster a form of purchase awareness which, in the current historical context, cannot be entirely demonized but instead needs to be reframed and balanced. This duality of the “meaning” embedded in commodities makes not only the position of the designer extremely and inevitably complex and contradictory but, first and foremost, that of the consumer.",
                    it: "Prima di rispondere alla domanda posta all'inizio dell'incontro, vorrei soffermarmi su un'affermazione di Noam Youngrak Son, che, in sostanza, dice: “designers are transformed into machines that create meaning to things”. Concordo pienamente con l'affermazione di Noam e mi rendo conto di quanto questa possa avere un duplice significato. Di fatto, “creando” significato, non stiamo più mercificando oggetti di prima necessità, ma feticci che, per loro natura, incorporano caratteristiche di identificazione e appartenenza sociale più che un ovvio e diretto utilizzo pratico. Questo fenomeno presenta sicuramente degli aspetti negativi: come già ben analizzato da Marx e Baudrillard, contribuisce ad alimentare il sistema capitalista dell'acquisto compulsivo. Tuttavia, può anche introdurre una coscienza di acquisto che, in questo momento storico, non può essere del tutto demonizzata, ma piuttosto ridimensionata e contestualizzata. Questa doppia valenza del “significato” presente nelle merci rende estremamente complessa e inevitabilmente contraddittoria non solo la posizione del “designer”, ma anche, e soprattutto, quella di chi acquista."
                },
                {
                    kind: "contribution",
                    author: "C. M. 〔MA DESIGN〕",
                    en: "Within academic circles, a fundamental step behind the work that is not conveyed is the value of time. The time spent in each activity of the work is quantifiable and should be remunerated. As students we do not know how much our work can be worth because the teaching of this discipline is based on the idea of work above all else. It is conveyed in every project, jokes are made about how few hours of sleep one has had in the week. This dynamic that is reiterated in work outside the academic environment should be regularized not normalized. As Guy Debord prophetically predicted in Society of the Spectacle “[...] capitalism orients itself towards the sale of “completely equipped” blocks of time, each one constituting a single unified commodity which integrates a number of diverse commodities”.{{2}} And we are producers of that “unified commodity,” perhaps we are the unifiers.",
                    it: "All'interno dell'ambito accademico una fase fondamentale alla base del lavoro che non viene trasmessa è il valore del tempo. Il tempo impiegato in ogni attività del lavoro è quantificabile e dovrebbe essere retribuito. Da student@ non sappiamo quanto possa valere il nostro lavoro perché l'insegnamento di questa disciplina si basa sull'idea del lavoro sopra qualsiasi cosa. Viene trasmesso in ogni progetto, si fanno battute sul quanto non si è dormito a settimana. Questa dinamica che si reitera nel lavoro all'esterno dall'ambiente accademico andrebbe regolarizzata non normalizzata. Come predisse profeticamente Guy Debord nella Società dello spettacolo “[...] nel suo settore più avanzato, il capitalismo concentrato si orienta verso la vendita di blocchi di tempo “completamente attrezzati”, ognuno dei quali costituisce una sola merce unificata, che ha integrato un certo numero di merci diverse”.{{2}} E noi oggi produciamo quella “merce unificata”, anzi forse siamo l@ unificator@."
                },
                {
                    kind: "contribution",
                    author: "L. M. 〔MA DESIGN〕",
                    en: "The seminar provided an opportunity to reflect on the role of design and its implications, highlighting the inconsistencies that characterize the entire design system, including the universities that train future designers. The figure of the designer today is often trapped in an idealized image, born from a self-referential discourse that celebrates creativity as an absolute value, but stifles any critical or subversive impulse. As a result, design loses its transformative power, reducing itself to a consumable product or an ideology to be celebrated, rather than a tool for change. Universities seem divided: on one hand, they do not truly prepare students for the reality of the workforce, which is marked by precariousness and uncertainty; on the other hand, they focus on projects that lack substance and impact, privileging form over content. This approach limits experimentation, which is essential for creative and critical growth, risking the formation of designers who are unprepared to face the challenges of the profession and change the system they operate in.",
                    it: "Il seminario ha offerto un'opportunità di riflessione sul ruolo del design e le sue implicazioni, mettendo in luce le incoerenze che caratterizzano l'intero sistema del design, incluse le università che formano i futuri designer. La figura del designer oggi è spesso intrappolata in un'immagine idealizzata, frutto di un discorso autoreferenziale che celebra la creatività come valore assoluto, ma soffoca ogni slancio critico o sovversivo. Così, il design perde la sua capacità di essere trasformativo, riducendosi a un prodotto consumabile o a un'ideologia da celebrare, piuttosto che a uno strumento di cambiamento. Le università sembrano divise: da un lato, non preparano davvero alla realtà del mondo del lavoro, fatto di precarietà e incertezze; dall'altro, si concentrano su progetti privi di contenuto e impatto, privilegiando la forma rispetto al contenuto. Questo approccio limita la sperimentazione, fondamentale per una crescita creativa e critica, rischiando di formare designer incapaci di affrontare le sfide del lavoro e di cambiare il sistema in cui operano."
                }
            ],
            footnotes: [
                {
                    n: 2,
                    en: 'Debord, Guy. <i>The Society of the Spectacle</i>. Black&Red Editions, 1967.',
                    it: 'Debord, Guy. <i>The Society of the Spectacle</i>. Black&Red Editions, 1967.'
                }
            ]
        },
        {
            src: "Images/gallery/04-seano.jpg",
            title: "Client enters the chat",
            titleLines: [
                "CLIENT ENTERS <span class=\"sups\">THE</span> CHAT"
            ],
            authors: "Seano, Lentini, Roberti",
            explanations: [
                {
                    kind: "description",
                    en: "This manifesto is an example of a meta-meme that conveys an experience of frustration related to tax management in a work context. The composition is layered, borrowing the structure of the meme loop, with an overlap of texts and images that amplifies the sense of confusion and discomfort typical of certain situations. A discussion that is visually dramatized through iconic images taken from the meme universe.",
                    it: "Questo manifesto è un esempio di meta-meme che racconta un'esperienza di frustrazione legata alla gestione della tassazione in contesto lavorativo. La composizione è stratificata, prendendo in prestito la struttura del loop, con una sovrapposizione di testi e immagini che amplifica il senso di confusione e disagio tipico di determinate situazioni. Una discussione che viene visivamente drammatizzata attraverso immagini iconiche tratte dall'universo dei meme."
                },
                {
                    kind: "contribution",
                    author: "L. S. 〔MA VISUAL ARTS〕",
                    en: "The overall experience of the seminar proved to be a significant opportunity to recognize, on a collective level, the need to visually ironize critical issues related to the interpretation of a complex and, at times, inhospitable present. The emergence of memesthetics and ways of analysing humour through images that encapsulate moods and human conditions forces us to reflect on the fundamental of images and their manipulation in the contemporary context. In such a framework of complexity, declaring oneself “ready” to deal with this work environment seems unrealistic. However, developing a critical awareness of the role of images in contemporary life becomes an essential way to protect ourselves, helping to feel less and less a part of a generalized problem.",
                    it: "L'esperienza complessiva del seminario si è rivelata un'opportunità significativa per riconoscere, a livello collettivo, la necessità di ironizzare visivamente sulle criticità legate all'interpretazione di un presente complesso e, a tratti, inospitale. L'emergere della memestetica e delle modalità di analisi dell'umorismo attraverso immagini che incapsulano stati d'animo e condizioni umane ci invita a riflettere sul ruolo fondamentale delle immagini nel contesto contemporaneo, capaci di instillare pensieri e sensazioni profonde. In un simile quadro di complessità, dichiararsi “prontx” ad affrontare questo ambiente lavorativo appare irrealistico. Tuttavia, sviluppare una consapevolezza critica sul ruolo dell'immagine nella contemporaneità diventa un modo essenziale per tutelarsi, contribuendo a sentirsi sempre meno parte di un problema generalizzato."
                },
                {
                    kind: "contribution",
                    author: "M. L. 〔MA DESIGN〕",
                    en: "Just days before the workshop, me and my colleagues directly experienced a sense of unpreparedness when dealing with a client. We realized that we didn't know how to manage the relationship properly, partly due to our limited understanding of certain dynamics, such as the withholding tax mentioned in the manifesto. The presentations were very relevant and useful. In particular, I found the second presentation by Claudia Doms extremely aligned with our situation. I also greatly appreciated the third one, which focused more on the topic of memes (it allowed me to discover some incredible meme pages!).",
                    it: "Proprio nei giorni precedenti al workshop, con dei colleghi abbiamo sperimentato direttamente la sensazione di impreparazione nel confrontarci con un committente. Ci siamo resi conto di non saper gestire adeguatamente il rapporto con il cliente, anche a causa della nostra scarsa conoscenza di alcune dinamiche, come quella della ritenuta d'acconto menzionata nel manifesto. Gli interventi proposti sono stati molto pertinenti e utili. In particolare, ho trovato estremamente affine alla nostra situazione il secondo intervento di Claudia Doms, mentre ho apprezzato moltissimo il terzo, dedicato più alla questione dei meme (mi ha permesso di scoprire alcune pagine di meme incredibili)."
                },
                {
                    kind: "contribution",
                    author: "C. R. 〔MA DESIGN〕",
                    en: "I don't feel completely ready to enter the design industry, especially when it comes to financial aspects. I feel like I'm still lacking skills in financial management. During my studies, for example, we never made an estimate of a project or negotiated fees with clients. To be able to live comfortably from this job, I believe it's essential to develop a more entrepreneurial mindset and learn to make compromises on what you create. Without these skills, I think it will be difficult to face the financial challenges that inevitably arise at the start of an independent career. This makes me think that, if things don't go as planned, it could become tempting to consider switching to a more stable profession.",
                    it: "Non mi sento completamente pronta ad affrontare il mondo del lavoro nel design, soprattutto per quanto riguarda gli aspetti economici. Penso che mi manchino ancora competenze nella gestione finanziaria. Durante gli studi, infatti, non abbiamo mai realizzato un preventivo o negoziato il compenso con un cliente. Per riuscire a vivere tranquillamente di questo lavoro, credo sia fondamentale sviluppare una mentalità più imprenditoriale e imparare a scendere a compromessi su ciò che si realizza. Senza queste competenze, credo che sarà difficile affrontare le difficoltà economiche che inevitabilmente si presentano all'inizio di una carriera da freelance. Questo mi fa pensare che, se le cose non dovessero andare per il verso giusto, potrebbe diventare allettante prendere in considerazione la possibilità di orientarmi verso una professione più stabile."
                }
            ]
        },
        {
            src: "Images/gallery/05-castelli.jpg",
            title: "When the media scape is polluted",
            titleLines: [
                "WHEN <span class=\"sups\">THE</span> MEDIA",
                "LANDSCAPE <span class=\"sups\">IS</span>",
                "BRUTALLY POLLUTED"
            ],
            authors: "Castelli, Segna, Gentile",
            explanations: [
                {
                    kind: "description",
                    en: "The closure within our bubble of inside jokes grows in direct proportion to the fear we feel toward the job market and the absurd absurdity of the media landscape surrounding us. The chill guy template holds a central position in our imaginary: an emblematic case of an innocent memetic figure turned into a copyrighted object while it was simply having fun with its digital friends.",
                    it: "La chiusura all'interno della nostra bolla di inside jokes cresce in proporzione diretta alla paura che proviamo nei confronti del mondo del lavoro e alla follia demenziale del panorama mediatico che ci circonda. Il template del chill guy occupa una posizione centrale nel nostro immaginario: un caso emblematico di una figura memetica innocente, trasformata in oggetto soggetto a copyright proprio nel momento in cui si stava semplicemente divertendo con l@ su@ amich@ digitali."
                },
                {
                    kind: "contribution",
                    author: "M. C. 〔MA DESIGN〕",
                    en: "The preparation offered to us visual communication design students leaves a sense of moral responsibility linked to the profession. Communicating «well» and «in the right way for everyone» appears to be an ambiguous ideal, since the designer is not a speaker who exposes his own truth, but a mediator between a thesis and an audience with unpredictable preferences and sensitivities. How to balance ethics, aesthetics and comprehensibility without imposing or misrepresenting? In this context, the meme emerges as a curious phenomenon: a synthesis between reflection and lightness, capable of tackling complex issues in a playful way. But can a meme really do justice to profound issues or does it risk trivializing them? This is the contemporary dilemma. For now we only know that it works a lot as «bait» to attract the most disinterested and asks them a question that they would not have arrived at without this new communication expedient; it hides its reflective matrix under a playful and botched guise, and we designers like this.",
                    it: "La preparazione offerta a noi studentx di design della comunicazione visiva lascia in sospeso un senso di responsabilità morale legato al mestiere. Comunicare «bene» e «nel modo giusto per tuttx» appare un ideale ambiguo, poiché il designer non è unx oratorx che espone una propria verità, ma unx mediatorx tra una tesi e un pubblico dalle preferenze e sensibilità imprevedibili. Come equilibrare etica, estetica e comprensibilità senza imporre o travisare? In questo contesto, il meme emerge come un fenomeno curioso: una sintesi tra riflessione e leggerezza, capace di affrontare temi complessi in modo giocoso. Ma può davvero un meme fare giustizia a questioni profonde o rischia di banalizzarle? Questo è il dilemma contemporaneo. Per ora si sa solo che funziona molto come «esca» per attrarre i più disinteressati e pone loro un quesito a cui non sarebbero arrivati senza questo nuovo espediente comunicativo; il quale cela la sua matrice riflessiva sotto una veste scherzosa e raffazzonata, e a noi designer questo piace."
                },
                {
                    kind: "contribution",
                    author: "A. S. 〔MA VISUAL ARTS〕",
                    en: "The question about feeling ready to face the work environment is complicated for me, as I enrolled in the master's program in visual arts and expanded cinema after completing a bachelor degree in design. However, I believe that the economic and managerial challenges associated with finding a job after graduation are similar, if not even more pronounced: most likely working with a VAT, desperately searching for a place that will hire you, building a career that, if not secure, is at least stable, and so on. Knowing myself, I am confident that I will find independent ways, not academically traceable, that will be formative in terms of managing resources on my own and helping me create a certain identity and “respect” in the field I am about to enter.",
                    it: "La domanda sul sentirmi pronto ad affrontare l'ambiente di lavoro è complicata, in quanto a seguito di un percorso triennale in design mi sono iscritto al corso di laurea magistrale in arti visive e cinema espanso. Ritengo comunque che le problematiche economiche e gestionali legate a cercare un lavoro post laurea siano simili, se non addirittura accentuate: lavorare quasi certamente con partita iva, cercare disperatamente un posto in cui ti assumano, costruire una carriera, se non sicura, comunque stabile ecc ecc. Conoscendomi, sono comunque certo che troverò delle modalità autonome, non accademicamente rintracciabili, che possano essere formative da un punto di vista di gestione autonoma delle risorse e per crearmi una certa identità, un certo “rispetto” nel mondo a cui sto per accedere."
                },
                {
                    kind: "contribution",
                    author: "F. G. 〔MA VISUAL ARTS〕",
                    en: "I am currently following a path that combines different fields. After completing my bachelor degree in design I enrolled in a master's degree in visual arts and expanded cinema, which opened my eyes to the complexities of the creative industry. However, I believe that the economic and managerial challenges after graduation will be similar. My goal is to create my own multidisciplinary practice, which transcends conventional boundaries and offers opportunities in various fields. I'm not interested in fitting into predefined roles or following predefined career paths. Instead, my goal is to develop a space where I can explore different artistic and professional practices while maintaining the flexibility and independence that will allow me to shape my future. I believe that by working outside of traditional structures, I will learn to manage resources effectively, create a unique identity, and ultimately carve out a niche for myself in the industry. These lessons, which may not be easily teachable in an academic setting, will help me gain the experience needed to build a respected and sustainable career.",
                    it: "Attualmente sto percorrendo un percorso che unisce campi diversi. Dopo aver completato la mia laurea triennale in design, mi sono iscritto a una magistrale in arti visive e cinema espanso, che mi ha aperto gli occhi sulle complessità dell'industria creativa. Tuttavia, ritengo che le sfide economiche e manageriali dopo la laurea saranno simili. Il mio obiettivo è creare il mio studio multidisciplinare, che trascenda i confini convenzionali e offra opportunità in vari campi. Non mi interessa inserirmi in ruoli predefiniti o seguire percorsi di carriera già tracciati. Il mio obiettivo è invece sviluppare uno spazio in cui posso esplorare diverse pratiche artistiche e professionali mantenendo la flessibilità e l'indipendenza che mi consentiranno di dare forma al mio futuro. Credo che lavorando al di fuori delle strutture tradizionali, imparerò a gestire le risorse in modo efficace, a creare un'identità unica e, infine, a ritagliarmi una nicchia nel settore. Queste lezioni, che potrebbero non essere facilmente insegnabili in un contesto accademico, mi aiuteranno ad acquisire l'esperienza necessaria per costruire una carriera rispettata e sostenibile."
                }
            ]
        },
        {
            src: "Images/gallery/06-worrying.jpg",
            title: "Worrying solves nothing",
            titleLines: [
                "WORRYING",
                "SOLVES NOTHING"
            ],
            authors: "Bua, Giunta, Cuomo, Peretti, Gennari, Marchi",
            explanations: [
                {
                    kind: "description",
                    en: "We sought to address the challenging question: “Do you think you are ready to face the work environment in the design field once you graduate?”. Feeling disoriented and uncertain, we realized we needed guidance. So, we turned to the Oracle of Design Manifestos for advice. But what can one do in moments of disillusionment and anxiety about the future? Needless to say, the Oracle of Design Manifestos offered little help.",
                    it: "Ci siamo postx una domanda impegnativa: “Pensi di essere pronto ad affrontare il mondo del lavoro nel campo del design una volta laureatx?” Sentendoci disorientatx e incertx, ci siamo resi conto di aver bisogno di guida. Così, ci siamo rivolti all'Oracolo dei Manifesti del Design in cerca di consigli. Cosa si può fare in questi momenti di disillusione e ansia per il futuro? Inutile dire che l'Oracolo dei Manifesti del Design si è rivelato di ben poco aiuto."
                },
                {
                    kind: "contribution",
                    author: "M. B. 〔MA DESIGN〕",
                    en: "Facing the work environment in the design field after graduation is both exciting and daunting. During the seminar, we discussed how humor, especially through memes, can be a powerful tool to navigate these challenges. Memes allow us to address current issues with irony, making them accessible to those open to dialogue and debate. This approach reflects the versatility needed in design: the ability to communicate complex ideas in a way that resonates with diverse audiences. While I feel prepared to engage creatively, my concerns lie in translating this into professional contexts where expectations are high and interpretations vary. The fear of not fully meeting industry standards persists, but I believe that embracing humor and critical thinking can bridge gaps, foster understanding, and ultimately strengthen my preparation for the design world.",
                    it: "Affrontare il mondo del lavoro nel campo del design dopo la laurea è sia entusiasmante che impegnativo. Durante il seminario, abbiamo discusso di come l'ironia, in particolare attraverso i meme, possa essere uno strumento potente per affrontare queste sfide. I meme permettono di trattare temi attuali con leggerezza, rendendoli accessibili a chi è pronto al dialogo e al confronto. Questo approccio riflette la versatilità necessaria nel design: la capacità di comunicare idee complesse in modo che risuonino con un pubblico variegato. Anche se mi sento preparata a esprimermi creativamente, resta la preoccupazione di riuscire a tradurre tutto ciò in contesti professionali dove le aspettative sono elevate e le interpretazioni diverse. La paura di non soddisfare appieno gli standard del settore esiste, ma credo che abbracciare l'ironia e il pensiero critico possa colmare le lacune, favorire la comprensione e rafforzare la mia preparazione per il mondo del design."
                },
                {
                    kind: "contribution",
                    author: "E. P. 〔MA DESIGN〕",
                    en: "Following the final part of Afonso de Matos' talk, I had much to think about the role of designers as workers. I have the impression that there's a significant risk in treating ourselves (as designers) as a separate “class” (socially speaking). The risk lies in losing sight of something crucial: we are part of the working class. Perhaps we should start looking around, reconnecting with other workers who face similar conditions (even in entirely different fields), and understanding what ties us to the other professions we interact with. We should think less as isolated “creatives” and more as individuals embedded in a contractual and work environment that, more often than not, we share with others. Perhaps this could be a good starting point to build collective strength, as well as new forms of solidarity, including union-based ones. And maybe, a world where working sucks a little less for everyone.",
                    it: "Dopo la parte finale dell'intervento di Afonso de Matos, ho avuto molto da pensare sul ruolo dei designer come lavoratorx. Ho l'impressione che ci sia un rischio significativo nel trattare noi stessx (come designer) come una “classe” separata (socialmente parlando). Il rischio sta nel perdere di vista qualcosa di fondamentale: siamo parte della classe operaia. Forse dovremmo iniziare a guardarci intorno, a riconnetterci con altri lavorator3 che affrontano condizioni simili (anche in campi completamente diversi) e a capire cosa ci lega alle altre professioni con cui interagiamo. Dovremmo pensare meno come “creativx” isolati e più come individui inseriti in un contesto contrattuale e lavorativo che, il più delle volte, condividiamo con altrx. Forse questo potrebbe essere un buon punto di partenza per costruire una forza collettiva e nuove forme di solidarietà, anche di tipo sindacale. E forse, un mondo in cui lavorare fa meno schifo per tuttx."
                },
                {
                    kind: "contribution",
                    author: "S. G. 〔MA DESIGN〕",
                    en: "The workshop made me question what it really means to be ready for the design job market. It's not just about technical skills or having a strong portfolio, but about critical awareness: how much are we influenced by the idea of what a “good” designer should be? In design, we are often presented with an ideal model to follow: the successful designer, always perfect, innovative, and capable of solving every problem. While working on the comparison between manifestos and memes, I realized that both can be powerful tools to express ideas and challenge the system, but they are often reduced to empty forms without real impact. I understood that the issue isn't so much about lacking technical skills, but the risk of losing my voice and my unique way of working in a system that rewards conformity and speed.",
                    it: "Il workshop mi ha portato a interrogarmi su cosa significhi davvero essere prontu per il mondo del lavoro nel design. Non è solo una questione di competenze tecniche o di portfolio, ma di consapevolezza critica: quanto ci lasciamo influenzare dall'idea di come un “bravu” designer dovrebbe essere? Spesso nel design ci viene proposto un modello ideale da seguire: il designer di successo, sempre perfetto, innovativo, capace di risolvere ogni problema. Lavorando sul confronto tra manifesti e meme, ho capito che entrambi possono essere strumenti molto forti per esprimere idee e sfidare il sistema, ma spesso vengono ridotti a forme vuote, senza vero impatto. Mi sono resa conto che il problema non è tanto non avere le capacità tecniche, ma il rischio di perdere la mia voce e il mio modo unico di lavorare, in un sistema che preferisce chi si adatta e va veloce."
                },
                {
                    kind: "contribution",
                    author: "T. C. 〔MA DESIGN〕",
                    en: "During the workshop I found the speech by Claudia Doms on the post-graduate life of graphic designers particularly interesting. Some graduates underlined the impossibility of acquiring all the necessary skills exclusively during the academic career. I believe that practical experience is essential to fully understand the designers' work, which is why I consider internships essential. However, I believe that universities should focus more on skills that are truly useful to the professional world, reducing marginal exams in favor of more targeted teaching. It would be appropriate to introduce a greater number of workshops and practical laboratories, limiting theoretical exams which are often distant from the objectives of the course of study. While recognizing the importance of theory in some areas, universities should review their programs, favoring an educational offering more oriented towards preparing designers for the world of work.",
                    it: "Durante il workshop ho trovato particolarmente interessante l'intervento di Claudia Doms sulla vita post-laurea dellx grafichx. Alcune laureatx hanno sottolineato l'impossibilità di acquisire tutte le competenze necessarie esclusivamente durante il percorso accademico. Ritengo che l'esperienza pratica sia fondamentale per comprendere appieno il lavoro dellx designer, motivo per cui considero i tirocini essenziali. T uttavia, credo che l'università debba focalizzarsi maggiormente su competenze realmente utili al mondo professionale, riducendo esami marginali a favore di un insegnamento più mirato. Sarebbe opportuno introdurre un numero maggiore di workshop e laboratori pratici, limitando gli esami teorici spesso distanti dagli obiettivi del corso di studi. Pur riconoscendo l'importanza della teoria in alcuni ambiti, le università dovrebbero rivedere i propri programmi, privilegiando un'offerta formativa più orientata alla preparazione dellx designer per il mondo del lavoro."
                },
                {
                    kind: "contribution",
                    author: "A. G. 〔BA DESIGN〕",
                    en: "I believe I have a solid theoretical and practical foundation to face the work environment in the design field, thanks to the studies and projects I have developed. However, there are aspects that concern me, such as managing tight deadlines and working under pressure, which are common in design. Additionally, I still lack practical experience, especially in collaborating with clients and coordinating a team. I am aware that adapting to professional dynamics requires continuous evolution, but I am determined to improve in these areas. Another concern is balancing client expectations with creative vision, trying to reconcile aesthetics with practical needs. For this reason, I believe developing skills in communication and problem-solving will be essential.",
                    it: "Al momento, credo di avere una buona base teorica e pratica per affrontare l'ambiente di lavoro nel campo del design, grazie agli studi e ai progetti che ho sviluppato. Tuttavia, ci sono aspetti che mi preoccupano, come la gestione delle scadenze strette e il lavorare sotto pressione, che è comune nel design. Inoltre, mi manca ancora esperienza sul campo, soprattutto nel collaborare con clienti e nel coordinare un team di lavoro. Sono consapevole che l'adattamento alle dinamiche professionali richiede continua evoluzione, ma sono determinato a migliorare in questi aspetti. Un'altra preoccupazione riguarda il bilanciamento tra le aspettative dei clienti e la visione creativa, cercando di conciliare estetica e esigenze pratiche. Per questo, sento che sviluppare competenze nella comunicazione e nel problem solving sarà fondamentale."
                },
                {
                    kind: "contribution",
                    author: "B. M. 〔BA DESIGN〕",
                    en: "I don't feel completely ready to face the working world in the field of design. I probably lack solid practical experience and the confidence needed to translate creative ideas into concrete, valuable projects. I'm also worried about not being innovative enough, failing to meet client expectations, or not standing out in a highly competitive field. Facing a dynamic environment where constant evolution is required can seem intimidating. I believe working on real projects, receiving constructive feedback, and building a network of contacts with mentors and colleagues can help me address these gaps and gradually overcome my insecurities. Over time, I'm confident that I will gain greater trust in my abilities.",
                    it: "Non mi sento del tutto pronto ad affrontare il mondo del lavoro nel campo del design. Probabilmente mi manca una solida esperienza pratica e la sicurezza necessaria per tradurre idee creative in progetti concreti e di valore. Mi preoccupa anche l'idea di non essere abbastanza innovativo, di non riuscire a soddisfare le aspettative del cliente o di non distinguermi in un settore altamente competitivo. Il confronto con un ambiente dinamico, in cui è richiesta una continua evoluzione, può sembrare intimidatorio. Credo che lavorare su progetti reali, ricevere feedback costruttivi e costruire una rete di contatti con mentori e colleghi possa aiutarmi a colmare queste lacune e a superare gradualmente le mie insicurezze. Con il tempo, sono certa che acquisirò una maggiore fiducia nelle mie capacità."
                }
            ]
        },
        {
            src: "Images/gallery/07-barletti.jpg",
            title: "Recently graduated designers",
            titleLines: [
                "LIFE <span class=\"sups\">OF</span> RECENTLY",
                "GRADUATED DESIGNERS"
            ],
            authors: "Barletti, Deliu, Parolin, Zou",
            explanations: [
                {
                    kind: "description",
                    en: "The poster reflects on the question: “are you ready to work in the field of design after leaving university?” Ours is a representation of what is likely to happen, in case you think you are. After writing the CV for a certain field of design, it's time to find a job and get employed. Here begins a vicious circle: you are hired as a trainee and are paid very little or nothing. At the end of the contract you are dissatisfied and/or not renewed. You are forced to start all over again.",
                    it: "Il manifesto riflette sulla domanda: “sei prontx a lavorare nel campo del design dopo l'università?”. Il nostro è la rappresentazione di ciò che è plausibile che accada, in caso si pensi di esserlo. Redatto il curriculum per un determinato campo del design si ricerca un'offerta di lavoro. Qui comincia un circolo vizioso tremendo: vieni assunto come tirocinante e vieni retribuito poco o per nulla. Al termine del contratto sei insoddisfattx e/o non sei rinnovato. Si è costretti a rimboccarsi di nuovo le maniche."
                },
                {
                    kind: "contribution",
                    author: "M. B. 〔MA DESIGN〕",
                    en: "Do I think I am ready to work in the field I studied for? With all the necessary distinctions, I think so. After five years of study I am able to get by. Certainly, however, the university is not able to introduce people to the field of work. In fact, the vast majority of practical courses lack a real client. Professors cannot go beyond pointing out obvious mistakes, they have no real interest in the design choices that are made. It is precisely the world of design work that unfortunately has well-known dynamics. The creative work somehow has less value compared to others: the time it takes to come up with something that is qualitatively valid is ignored. I therefore appreciated that you pointed out that for this workshop no one got any fee from Iuav. It makes one reflect on how systemic this dynamic is.",
                    it: "Penso di essere pronto a lavorare nell'ambito per cui ho studiato? Con tutti i distinguo del caso, penso di sì. Dopo cinque anni di studio sono in grado di cavarmela. Sicuramente però l'università non sia in grado di far conoscere l'ambito lavorativo. Infatti, la stragrande maggioranza dei corsi pratici manca di un vero e proprio committente. I professori non possono andare oltre il segnalare errori evidenti, non hanno reale interesse nelle scelte progettuali che si compiono. Proprio il mondo lavorativo del design, poi, ha purtroppo delle dinamiche note. È consuetudine la svalutazione del lavoro creativo: si ignora il tempo che serve per elaborare qualcosa che sia qualitativamente valido. Ho apprezzato quindi che abbiate segnalato che per questo workshop nessuno abbia avuto un compenso dallo Iuav. Fa riflettere su come questa dinamica sia sistemica."
                },
                {
                    kind: "contribution",
                    author: "C. D. 〔MA DESIGN〕",
                    en: "I found the topics discussed very relevant and contemporary, especially when teh book “221 complaints” was presented, which collected a series of reflections on what people actually felt they lacked at the end of a design degree. I identified with many of the observations, so no, I don't feel completely ready to enter the workforce. I think teaching could be structured differently, expanding the scope of the courses, both in terms of design and more technical and practical aspects related to the professional world. I also found it very important that the guests highlighted the lack of recognition of their work by Iuav, showing that the very institutions that should care about our profession and our rights are the first to devalue it, giving in to the classic dynamics of exploitation.",
                    it: "Ho sentito molto vicini ed attuali i temi affrontati, in particolare quando è stato presentato il libro “221 complaints” che raccoglieva tutta una serie di riflessioni su cosa effettivamente le persone, alla fine di un corso di laurea in design, si sentissero più carenti. Mi sono ritrovata in molte osservazioni per cui no, non mi sento totalmente pronta ad entrare nel mondo del lavoro. Penso che l'insegnamento possa essere strutturato in maniera diversa, ampliando il raggio d'azione dei corsi, sia per quanto riguarda il progetto sia per questioni più tecniche e pratiche legate al mondo del lavoro. Ho trovato poi molto importante che le persone invitate abbiano sottolineato il mancato riconoscimento del loro lavoro da parte dello Iuav, dimostrando che le stesse istituzioni che dovrebbero avere a cuore il nostro mestiere e i nostri diritti sono le prime a non valorizzarlo, cedendo alle classiche dinamiche di sfruttamento."
                }
            ]
        },
        {
            src: "Images/gallery/08-stress.jpg",
            title: "Stress or release",
            titleLines: [
                "STRESS <span class=\"sups\">OR</span> RELEASE"
            ],
            authors: "Baudino, Righi, Galas",
            explanations: [
                {
                    kind: "description",
                    en: "Since no one within our group already feels like a professional yet, our manifesto is set in the university environment, a space not without its issues. In order to convey a disruptive message, we decided to contrast form and content: a comic and meme-encoded language put in a serious layout, inspired by Iuav's press releases. Our claims (or complaints) stand out framed in a placeholder text, to criticize the habit of treating text boxes as decorative elements regardless of what needs to be said.",
                    it: "Tra i membri del gruppo è emerso come nessuno di noi si senta già un* professionista, motivo per cui il manifesto si colloca all'interno dell'ambito universitario, spazio non esente da problematiche. Per un messaggio più dirompente abbiamo deciso di mettere in contrapposizione forma e contenuto, con un linguaggio comico e “memetico” in forma seriosa, che riprende i comunicati stampa dello Iuav. Le nostre rivendicazioni (o lamentele) spiccano in un testo corrente segnaposto, per criticare l'abitudine di trattare caselle di testo come elementi decorativi a prescindere da cosa si voglia dire."
                },
                {
                    kind: "contribution",
                    author: "G. R. 〔MA DESIGN〕",
                    en: "I think that as a designer I have been taught well how to “enjoy my ditch”, but not how to disrupt it. Professors always told me that they were trying to simulate the work environment inside the class, something that I've always found strange. I get that they want to teach us the job but courses in the design field are useful for much more than that. Give me tools, teach me critical thinking or to question what someone in charge tells me to do, show me how this market works instead of simulating something unrealistic. I need to know the rules in order to change them. What if I want to leave my “enjoyable ditch”? I feel like since the first year of university my feelings towards design have changed and I'm not sure in which direction, maybe it' s just disillusion. The only thing I'm certain of is that I need, love and desire collective work. Without other people I'm completely lost so… What if designers really unionized??",
                    it: "Credo che come progettista mi sia stato insegnato bene come “godermi la mia fossa”, ma non come disturbarla. L3 professor3 mi hanno sempre detto che cercavano di simulare l'ambiente di lavoro all'interno della classe, cosa che ho sempre trovato strana. Capisco che vogliano insegnarci il lavoro, ma i corsi di progettazione servono a molto di più. Darmi degli strumenti, insegnarmi il pensiero critico o a mettere in discussione ciò che qualcuno mi dice di fare, mostrarmi come funziona questo mercato invece di simulare qualcosa di irrealistico. Ho bisogno di conoscere le regole per poterle cambiare. E se volessi abbandonare la mia “piacevole fossa”? Sento che dal primo anno di università i miei sentimenti verso il design siano cambiati e non so in quale direzione, forse è solo disillusione. L 'unica cosa di cui sono certa è che ho bisogno, amo e desidero il lavoro collettivo. Senza altre persone sono completamente persa, quindi... E se l3 designer si sindacalizzassero davvero??"
                },
                {
                    kind: "contribution",
                    author: "J. B. 〔MA DESIGN〕",
                    en: "I don't think I'm ready for the work environment, and maybe I don't even want it. I think I lack most of the practical knowledge (how will I make an estimates of costs?), but I know for sure that I wouldn't have wanted to be taught this at the cost of the cultural and critical prompts I got in this chaos. Is what I'm doing useful? Does design make sense? I can't stand those who design uncritically without thinking of the consequences, I can't stand who thinks that design can save the world, as if it was a new Jesus, as if we could stop pollution discriminations wars and capitalism just by writing it in Helvetica, without realizing that everything is linked and guilty. I can't stand that I'm so intolerant. I am confused, but I realized that many of us are, that we can also laugh about it, albeit a bitter laugh. That using memes for this isn't just for fun, but it's instinctive and understandable.",
                    it: "Non mi sento pronta per l'ambiente lavorativo, e forse non ho neanche voglia di esserlo. Sento che mi mancano le conoscenze pratiche (come farò un preventivo?), ma so che non avrei voluto me le insegnassero a discapito degli spunti critici e culturali colti in mezzo al caos. Ciò che faccio serve davvero? Ha senso il design? Non sopporto chi lo usa in modo acritico senza pensare alle conseguenze, non sopporto chi pensa che possa salvare il mondo, come se fosse il nuovo messia, come se potesse risolvere inquinamento, discriminazioni, guerre e abbattere il capitalismo solo scrivendolo in Helvetica, senza pensare che tutto è intrecciato e tutto è colpevole. Non sopporto questo mio non sopportare. Sono confusa ma ho visto che lo siamo in tanti, che lo si può essere anche ridendo, seppur un riso amaro. Che dirlo con i meme non è solo per ridere, ma un mezzo istintivo e comprensibile."
                },
                {
                    kind: "contribution",
                    author: "M. G. 〔MA DESIGN〕",
                    en: "The workshop highlighted how design is both a political and cultural act, as well as a creative process. It is not just a tool to solve problems but a means to question and transform the world. The question about readiness for the design field made me reflect: are we truly prepared to make decisions that affect people, communities, and systems? Growing awareness of the social and ethical impacts of design is a crucial step, but continuous effort is needed to grasp the cultural and systemic complexities inherent in our work. “Not knowing” is not a weakness but a starting point: embracing it with curiosity and responsibility can lead us toward more inclusive and thoughtful design practices.",
                    it: "Il workshop ha evidenziato come il design sia un atto politico e culturale, oltre che un processo creativo. Non è solo un mezzo per risolvere problemi, ma uno strumento per interrogarsi sul mondo e trasformarlo. La domanda sulla preparazione al lavoro mi ha portato a riflettere: siamo davvero pronte a prendere decisioni che influenzano persone, comunità e sistemi? La crescente sensibilità verso gli impatti sociali ed etici del design è un passo fondamentale, ma serve un impegno costante per comprendere le complessità culturali e sistemiche che attraversano il nostro lavoro. Il “non sapere” non è una debolezza, ma un punto di partenza: accoglierlo con curiosità e responsabilità può portarci verso un design più inclusivo e consapevole."
                }
            ]
        },
        {
            src: "Images/gallery/09-malossi.jpg",
            title: "Is for me?",
            titleLines: [
                "IS FOR ME?"
            ],
            authors: "Malossi",
            explanations: [
                {
                    kind: "description",
                    en: "The university communicates in a formal manner, sometimes burdening issues that are not in fact formal. Sometimes there is simply no need to add tension in an environment that should be free and stimulate creativity. Sacrifices are of course expected in the students' routine, but too often they are aimed at learning or recognition that is only valid within the university, for example CFU (University Credits). The meme is meant to be ironic about a subject and a world often characterised by too little irony. Well, let's joke about it then!",
                    it: "L'università comunica in modo formale, talvolta appesantendo questioni che di fatto non lo sono. A volte semplicemente non è necessario aggiungere tensione in un ambiente che dovrebbe essere libero e stimolare la creatività. I sacrifici sono naturalmente previsti nella routine dellx studentx, ma troppo spesso sono finalizzati ad apprendimenti o riconoscimenti validi solo all'interno dell'università, vedi CFU (Crediti Formativi Universitari). Il meme vuole ironizzare su un tema e su un mondo spesso caratterizzato da troppa poca ironia. Be', allora scherziamoci su!"
                },
                {
                    kind: "contribution",
                    author: "A. M. 〔MA DESIGN〕",
                    en: "Approaching the writing of the contribution, I started thinking about the effectiveness of memes, and my own use of them. The question first disoriented me, then cleared up my own ideas. I'm not sure I'm actually ready, but I'm sure I don't feel ready for the world of work. I fear this big step, which I imagine to be made up of many jumps, where the playful dimension, in which I often feel caged, seems to disappear completely in favour of professionalism. Professionalism that, instead, seems to disappear in memes, where strict norms and tastes are completely out of whack. Must the modern designer know how to alternate, separating, the two types of language or must he know how to integrate them?",
                    it: "Approcciandomi alla scrittura del contributo ho iniziato a pensare all'efficacia dei meme, al loro utilizzo e al'uso che ne faccio. La domanda mi ha prima spiazzato, poi schiarito le mie stesse idee. Non sono sicuro di essere effettivamente pronto, ma sono sicuro di non sentirmi pronto per il mondo lavorativo. Temo questo grande passo, che immagino essere fatto di tanti sbalzi, dove la dimensione ludica, in cui mi sento spesso ingabbiato, sembra sparire del tutto in favore della professionalità. Professionalità che, invece, sembra scomparire nei meme, dove rigore, norme e gusti sono completamente sballati. L* designer modern* devono saper alternare, separando, i due tipi di linguaggi o devono saper integrarli?"
                }
            ]
        },
        {
            src: "Images/gallery/10-tripi.jpg",
            title: "The worst feeling of a designer's life",
            titleLines: [
                "<span class=\"sups\">THE</span> WORST FEELING <span class=\"sups\">OF</span>",
                "<span class=\"sups\">A</span> DESIGNER’S LIFE"
            ],
            authors: "Tripi",
            explanations: [
                {
                    kind: "description",
                    en: "I tried to address what I consider the worst feelings in a designer's life. I've been working as a designer for a while now and I always thought that the most annoying thing about this job is the last minute customer changes. I tried to create the manifesto using some of my favorite memes, trying to create a narrative given by the union of these.",
                    it: "Ho cercato di affrontare quella che reputo la peggiori sensazioni nella vita di un designer. È da un po' che lavoro come designer e ho sempre pensato che la cosa più fastidiosa di questo lavoro sia proprio i cambiamenti del cliente dell'ultimo momento. Ho cercato di creare il manifesto utilizzando alcuni dei miei meme preferiti, provando a creare una narrazione data dall'unione di questi. 3 Cfr. pp. 206-209."
                },
                {
                    kind: "contribution",
                    author: "F. T. 〔BA VISUAL ARTS〕",
                    en: "To be honest, I decided to attend the seminar for two reasons, the first is that I needed some CFUs{{3}}. The second is that in my work I have worked on several times on the development of projects focused on memes and for this reason I considered interesting the idea of holding a meeting on this particular topic. I am excited about how the meeting took place, it was very interesting to hear designers from different parts of the world react on a very important theme. It was also very interesting to talk about the concept of manifesto and memes in relation to the future, the approach to the world of work; memes are part of everyday life and have a huge influence on our lives. I think I am ready to get in touch with this world and deal with it.",
                    it: "Devo essere sincero, ho deciso di seguire il seminario per due ragioni, la prima è che avevo bisogno di alcuni CFU{{3}}, la seconda è che nel mio lavoro più volte ho lavorato sullo sviluppo di progetti incentrati sui meme e per questo consideravo interessante l'idea di svolgere un incontro su questo particolare tema. Sono entusiasta di come si è svolto l'incontro, è stato molto interessante ascoltare designer provenienti da diverse parti del mondo riflettere su un tema molto importante. Inoltre è stato molto interessante parlare del concetto di manifesto e di meme in relazione al futuro, all'approccio al mondo lavorativo; i meme fanno parte della quotidianità e hanno un'enorme influenza sulla nostra vita. Penso di essere pronto ad entrare in contatto con questo mondo ed averci a che fare."
                }
            ],
            footnotes: [
                {
                    n: 3,
                    en: 'See pp. 206–209.',
                    it: 'Cfr. pp. 206–209.'
                }
            ]
        }
    ];

    const A3_RATIO = 297 / 420;
    // Figma-style ring: flat sheets, whole circle readable from outside
    const POSTER_H = 1.55;
    const POSTER_W = POSTER_H * A3_RATIO;
    const RING_RADIUS = 3.35;
    const SPIN_SPEED = 0.14; // slow continuous loop
    const SETTLE_LERP = 0.09;
    const SETTLE_EPS = 0.004;

    let scene, camera, renderer, controls;
    let carouselGroup;
    let posterMeshes = [];
    let currentIndex = 0;
    let currentAngle = 0;
    let targetAngle = 0;
    const prefersReducedMotion =
        window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let spinning = !prefersReducedMotion;
    let settling = false;
    let clock;
    let pointerDown = null;
    let pointerMoved = false;
    let animRaf = 0;
    let resizeTimer = 0;
    let blurbHideTimer = 0;
    let focusHideTimer = 0;
    let siteMenu = null;

    const container = document.getElementById('gallery-canvas');
    const layoutEl = document.querySelector('.gallery-layout');
    const menuEl = document.querySelector('.hamburger-menu');
    const titleEl = document.getElementById('poster-title');
    const authorsEl = document.getElementById('poster-authors');
    const blurbEl = document.getElementById('gallery-poster-blurb');
    const focusEl = document.getElementById('gallery-focus');
    const focusBackdrop = document.getElementById('gallery-focus-backdrop');
    const focusPosterEl = document.getElementById('gallery-focus-poster');
    const btnResetCamera = document.getElementById('btn-reset-camera');
    const btnAddPoster = document.getElementById('btn-add-poster');
    const inputAddPoster = document.getElementById('input-add-poster');
    const uploadPanel = document.getElementById('gallery-upload');
    const uploadImageName = document.getElementById('upload-image-name');
    const uploadTitle = document.getElementById('upload-title');
    const uploadAuthors = document.getElementById('upload-authors');
    const uploadContributions = document.getElementById('upload-contributions');
    const inputAddTexts = document.getElementById('input-add-texts');
    const btnAddContribution = document.getElementById('btn-add-contribution');
    const btnUploadConfirm = document.getElementById('btn-upload-confirm');
    const btnUploadCancel = document.getElementById('btn-upload-cancel');
    const posterCountEl = document.getElementById('stat-poster-count');
    const CAMERA_HOME = { x: 0, y: 4.6, z: 9.2 };
    const FLOAT_BASE = 0.48; // lift off the floor — floating sheets
    const MESH_Y_BASE = FLOAT_BASE + POSTER_H * 0.5;
    let _hitPointer = null;
    let _hitRaycaster = null;
    let focused = false;
    let pendingImageFile = null;

    function updatePosterCounter() {
        if (posterCountEl) posterCountEl.textContent = String(POSTERS.length);
    }

    function relayoutRing() {
        const total = posterMeshes.length;
        if (!total) return;
        posterMeshes.forEach((g, i) => {
            const angle = (i / total) * Math.PI * 2;
            g.position.set(
                Math.sin(angle) * RING_RADIUS,
                0,
                Math.cos(angle) * RING_RADIUS
            );
            g.rotation.y = angle;
            g.userData.index = i;
            g.userData.windPhase = i * 1.73 + 0.4;
        });
        // Keep current selection angle coherent with new step size
        if (!spinning) {
            targetAngle = angleForIndex(currentIndex);
            currentAngle = targetAngle;
            if (carouselGroup) carouselGroup.rotation.y = currentAngle;
        }
    }

    function titleFromFilename(name) {
        return String(name || 'Untitled')
            .replace(/\.[^.]+$/, '')
            .replace(/[_-]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim() || 'Untitled';
    }

    function previewUrlFor(poster) {
        if (!poster) return '';
        if (poster.previewUrl) return poster.previewUrl;
        return resolvePosterUrl(poster.src);
    }

    function loadImageFile(file) {
        return new Promise((resolve, reject) => {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                try {
                    const baked = bakePosterWithHomeShadow(img);
                    resolve({ baked: baked, previewUrl: url });
                } catch (err) {
                    URL.revokeObjectURL(url);
                    reject(err);
                }
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Could not read ' + file.name));
            };
            img.src = url;
        });
    }

    function parseTextContribution(raw, fallbackAuthor) {
        const text = String(raw || '').replace(/\r/g, '').trim();
        if (!text) return null;

        let author = fallbackAuthor || 'Anonimo';
        let en = '';
        let it = '';

        const enMatch = text.match(/(?:^|\n)\s*(?:EN|ENG|English)\s*[:\-–]?\s*\n?([\s\S]*?)(?=(?:\n\s*(?:IT|ITA|Italian)\s*[:\-–]?)|$)/i);
        const itMatch = text.match(/(?:^|\n)\s*(?:IT|ITA|Italian)\s*[:\-–]?\s*\n?([\s\S]*?)(?=(?:\n\s*(?:EN|ENG|English)\s*[:\-–]?)|$)/i);

        if (enMatch || itMatch) {
            en = (enMatch && enMatch[1] ? enMatch[1] : '').trim();
            it = (itMatch && itMatch[1] ? itMatch[1] : '').trim();
        } else {
            en = text;
        }

        const authorLine = text.match(/^(?:Author|Autore|Nome)\s*[:\-–]\s*(.+)$/im);
        if (authorLine) author = authorLine[1].trim();

        return { author: author, en: en, it: it };
    }

    function readTextFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ''));
            reader.onerror = () => reject(reader.error || new Error('Could not read text'));
            reader.readAsText(file);
        });
    }

    function createContributionFields(data) {
        if (!uploadContributions) return;
        const item = data || { author: '', en: '', it: '' };
        const wrap = document.createElement('div');
        wrap.className = 'gallery-upload-contribution';
        wrap.innerHTML =
            '<input class="gallery-upload-pill gallery-upload-input upload-author" type="text" placeholder="Nome autore" autocomplete="off">' +
            '<textarea class="gallery-upload-textarea upload-en" rows="3" placeholder="Explanation (EN)"></textarea>' +
            '<textarea class="gallery-upload-textarea upload-it" rows="3" placeholder="Spiegazione (IT)"></textarea>';
        wrap.querySelector('.upload-author').value = item.author || '';
        wrap.querySelector('.upload-en').value = item.en || '';
        wrap.querySelector('.upload-it').value = item.it || '';
        uploadContributions.appendChild(wrap);
    }

    function collectUploadExplanations() {
        if (!uploadContributions) return [];
        return Array.prototype.slice.call(uploadContributions.querySelectorAll('.gallery-upload-contribution'))
            .map((wrap) => {
                const author = (wrap.querySelector('.upload-author')?.value || '').trim();
                const en = (wrap.querySelector('.upload-en')?.value || '').trim();
                const it = (wrap.querySelector('.upload-it')?.value || '').trim();
                if (!author && !en && !it) return null;
                return { author: author || 'Anonimo', en: en, it: it };
            })
            .filter(Boolean);
    }

    function openUploadPanel() {
        if (!uploadPanel) return;
        pendingImageFile = null;
        if (uploadImageName) uploadImageName.textContent = 'Scegli immagine…';
        document.querySelector('.gallery-upload-image')?.classList.remove('has-file');
        if (uploadTitle) uploadTitle.value = '';
        if (uploadAuthors) uploadAuthors.value = '';
        if (uploadContributions) uploadContributions.innerHTML = '';
        createContributionFields();
        uploadPanel.hidden = false;
        if (inputAddPoster) inputAddPoster.value = '';
        if (inputAddTexts) inputAddTexts.value = '';
    }

    function closeUploadPanel() {
        if (!uploadPanel) return;
        uploadPanel.hidden = true;
        pendingImageFile = null;
        document.querySelector('.gallery-upload-image')?.classList.remove('has-file');
        if (inputAddPoster) inputAddPoster.value = '';
        if (inputAddTexts) inputAddTexts.value = '';
    }

    async function commitUpload() {
        if (!pendingImageFile) {
            if (inputAddPoster) inputAddPoster.click();
            return;
        }
        const title = (uploadTitle && uploadTitle.value.trim()) || titleFromFilename(pendingImageFile.name);
        const authors = (uploadAuthors && uploadAuthors.value.trim()) || 'Uploaded';
        const explanations = collectUploadExplanations();

        if (btnUploadConfirm) btnUploadConfirm.disabled = true;
        if (btnAddPoster) btnAddPoster.disabled = true;
        try {
            const loaded = await loadImageFile(pendingImageFile);
            POSTERS.push({
                src: pendingImageFile.name,
                previewUrl: loaded.previewUrl,
                title: title,
                authors: authors,
                explanations: explanations
            });
            const mesh = createPosterMesh(loaded.baked, POSTERS.length - 1, POSTERS.length);
            carouselGroup.add(mesh);
            posterMeshes.push(mesh);
            relayoutRing();
            updatePosterCounter();
            closeUploadPanel();
        } catch (err) {
            console.warn(err);
        } finally {
            if (btnUploadConfirm) btnUploadConfirm.disabled = false;
            if (btnAddPoster) btnAddPoster.disabled = false;
        }
    }

    function stepSize() {
        return (Math.PI * 2) / Math.max(POSTERS.length, 1);
    }

    function normalizeAngle(a) {
        while (a > Math.PI) a -= Math.PI * 2;
        while (a < -Math.PI) a += Math.PI * 2;
        return a;
    }

    function indexFromAngle(angle) {
        const n = POSTERS.length;
        const step = stepSize();
        let idx = Math.round(-angle / step);
        return ((idx % n) + n) % n;
    }

    function angleForIndex(index) {
        return -index * stepSize();
    }

    /* Footnote popup — same behavior/markup as essay (script.js) */
    let activeFootnotes = {};
    let currentOpenFootnote = null;
    let lastFootnoteFocusEl = null;
    const footnotePopup = document.createElement('div');
    footnotePopup.className = 'footnote-popup';
    footnotePopup.innerHTML =
        '<div class="footnote-popup-content">' +
        '<button class="footnote-popup-close" aria-label="Close">×</button>' +
        '<div class="footnote-popup-number"></div>' +
        '<p class="footnote-popup-text"></p>' +
        '</div>';
    footnotePopup.setAttribute('role', 'dialog');
    footnotePopup.setAttribute('aria-modal', 'false');
    footnotePopup.setAttribute('aria-hidden', 'true');
    footnotePopup.setAttribute('tabindex', '-1');
    document.body.appendChild(footnotePopup);
    const footnoteCloseBtn = footnotePopup.querySelector('.footnote-popup-close');
    const footnoteNumberEl = footnotePopup.querySelector('.footnote-popup-number');
    const footnoteTextEl = footnotePopup.querySelector('.footnote-popup-text');

    function closeGalleryFootnote() {
        footnotePopup.classList.remove('active');
        footnotePopup.setAttribute('aria-hidden', 'true');
        footnotePopup.style.left = '';
        footnotePopup.style.top = '';
        footnotePopup.style.transform = '';
        footnotePopup.style.visibility = '';
        footnotePopup.style.opacity = '';
        if (currentOpenFootnote) {
            currentOpenFootnote.setAttribute('aria-expanded', 'false');
        }
        if (lastFootnoteFocusEl && typeof lastFootnoteFocusEl.focus === 'function') {
            lastFootnoteFocusEl.focus();
        }
        lastFootnoteFocusEl = null;
        currentOpenFootnote = null;
    }

    function openGalleryFootnote(number, lang, linkElement) {
        lastFootnoteFocusEl = document.activeElement;
        const safeLang = lang || 'en';
        const entry = activeFootnotes[number];
        const text = entry
            ? (entry[safeLang] || entry.en || '')
            : '';

        footnoteNumberEl.textContent = number;
        footnoteTextEl.innerHTML = text || '';
        footnotePopup.classList.remove('lang-en', 'lang-it');
        footnotePopup.classList.add('lang-' + safeLang);

        const pad = 24; // clear inset bordino
        const mobile = window.innerWidth <= 768;
        const rect = linkElement ? linkElement.getBoundingClientRect() : null;

        // Measure full note width off-screen (avoid body overflow clipping)
        footnotePopup.style.position = 'fixed';
        footnotePopup.style.left = '0px';
        footnotePopup.style.top = '0px';
        footnotePopup.style.right = 'auto';
        footnotePopup.style.bottom = 'auto';
        footnotePopup.style.transform = 'none';
        footnotePopup.style.visibility = 'hidden';
        footnotePopup.style.opacity = '0';
        footnotePopup.classList.add('active');
        const noteW = Math.ceil(footnotePopup.scrollWidth || footnotePopup.offsetWidth || 0);

        let left;
        let top;
        if (!rect) {
            left = pad;
            top = pad;
        } else if (mobile) {
            left = Math.min(window.innerWidth * 0.1, Math.max(pad, window.innerWidth - pad - noteW));
            top = rect.bottom + 10;
        } else {
            // Prefer just right of the number; if it would clip, keep full text
            // ending at the right edge (note grows toward the right).
            const preferLeft = rect.right + 8;
            const maxLeft = window.innerWidth - pad - noteW;
            left = preferLeft + noteW <= window.innerWidth - pad
                ? preferLeft
                : Math.max(pad, maxLeft);
            top = rect.top + rect.height / 2;
        }

        footnotePopup.style.left = left + 'px';
        footnotePopup.style.top = top + 'px';
        footnotePopup.style.transform = mobile ? 'none' : 'translateY(-50%)';
        footnotePopup.style.visibility = '';
        footnotePopup.style.opacity = '';
        footnotePopup.setAttribute('aria-hidden', 'false');
        footnotePopup.setAttribute('aria-label', 'Footnote ' + number);
        if (linkElement) linkElement.setAttribute('aria-expanded', 'true');
        window.requestAnimationFrame(() => footnoteCloseBtn && footnoteCloseBtn.focus());
    }

    function bindFootnoteLink(link) {
        link.setAttribute('aria-expanded', 'false');
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const number = link.textContent.trim();
            let lang = 'en';
            if (link.closest('.lang-it')) lang = 'it';
            else if (link.closest('.lang-en')) lang = 'en';

            if (currentOpenFootnote === link && footnotePopup.classList.contains('active')) {
                closeGalleryFootnote();
            } else {
                currentOpenFootnote = link;
                openGalleryFootnote(number, lang, link);
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (!footnotePopup.contains(e.target) && !e.target.closest('.footnote')) {
            if (footnotePopup.classList.contains('active')) closeGalleryFootnote();
        }
    });
    if (footnoteCloseBtn) {
        footnoteCloseBtn.addEventListener('click', () => closeGalleryFootnote());
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && footnotePopup.classList.contains('active')) {
            closeGalleryFootnote();
        }
    });

    function appendFootnoteRefs(el, text) {
        const parts = String(text || '').split(/(\{\{\d+\}\})/);
        parts.forEach((part) => {
            const m = part.match(/^\{\{(\d+)\}\}$/);
            if (m) {
                const a = document.createElement('a');
                a.href = '#';
                a.className = 'footnote sups';
                a.textContent = m[1];
                bindFootnoteLink(a);
                el.appendChild(a);
            } else if (part) {
                el.appendChild(document.createTextNode(part));
            }
        });
    }

    function setActiveFootnotes(footnotes) {
        activeFootnotes = {};
        (Array.isArray(footnotes) ? footnotes : []).forEach((note) => {
            activeFootnotes[String(note.n)] = {
                en: note.en || '',
                it: note.it || ''
            };
        });
    }

    function renderBlurb(explanations, footnotes) {
        if (!blurbEl) return;
        closeGalleryFootnote();
        blurbEl.innerHTML = '';
        const list = Array.isArray(explanations) ? explanations : [];
        setActiveFootnotes(footnotes);
        if (!list.length) {
            hideBlurb();
            return;
        }

        const frag = document.createDocumentFragment();
        list.forEach((item) => {
            const kind = item.kind || (item.author ? 'contribution' : 'description');
            const block = document.createElement('section');
            block.className = 'gallery-blurb-block gallery-blurb-block--' + kind;

            if (item.author) {
                const author = document.createElement('p');
                author.className = 'gallery-blurb-author';
                // Book: initials + course sit as superscript before the run-in text
                const label = document.createElement('span');
                label.className = 'sups';
                label.textContent = item.author;
                author.appendChild(label);
                block.appendChild(author);
            }

            const body = document.createElement('div');
            body.className = 'gallery-blurb-body';

            // Order: name → English (dark) → Italian (light)
            if (item.en) {
                const en = document.createElement('p');
                en.className = 'gallery-blurb-text lang-en';
                en.lang = 'en';
                appendFootnoteRefs(en, item.en);
                body.appendChild(en);
            }

            if (item.it) {
                const it = document.createElement('p');
                it.className = 'gallery-blurb-text lang-it';
                it.lang = 'it';
                appendFootnoteRefs(it, item.it);
                body.appendChild(it);
            }

            block.appendChild(body);
            frag.appendChild(block);
        });

        blurbEl.appendChild(frag);
        blurbEl.scrollTop = 0;
        blurbEl.hidden = false;
        blurbEl.classList.add('is-visible');
    }

    function hideBlurb() {
        if (!blurbEl) return;
        closeGalleryFootnote();
        blurbEl.classList.remove('is-visible');
        window.clearTimeout(blurbHideTimer);
        blurbHideTimer = window.setTimeout(() => {
            if (!blurbEl.classList.contains('is-visible')) {
                blurbEl.hidden = true;
                blurbEl.innerHTML = '';
            }
        }, 360);
    }

    function renderPosterTitle(p) {
        if (!titleEl) return;
        titleEl.innerHTML = '';
        const lines = Array.isArray(p.titleLines) && p.titleLines.length
            ? p.titleLines
            : [p.title || '—'];
        const hl = document.createElement('span');
        hl.className = 'gallery-title-hl';
        lines.forEach((line, i) => {
            if (i) hl.appendChild(document.createElement('br'));
            const row = document.createElement('span');
            row.innerHTML = String(line);
            hl.appendChild(row);
        });
        titleEl.appendChild(hl);
    }

    let lastFocusEl = null;

    function openFocus(index) {
        const p = POSTERS[index];
        if (!p || !focusEl || !focusPosterEl) return;
        closeUploadPanel();
        focused = true;
        lastFocusEl = document.activeElement;
        renderPosterTitle(p);
        if (authorsEl) {
            authorsEl.textContent = '';
            authorsEl.hidden = true;
        }
        focusPosterEl.src = previewUrlFor(p);
        focusPosterEl.alt = p.title || 'Manifesto';
        focusEl.hidden = false;
        focusEl.setAttribute('role', 'dialog');
        focusEl.setAttribute('aria-modal', 'true');
        focusEl.setAttribute('aria-label', p.title || 'Manifesto');
        layoutEl?.classList.add('is-focused');
        menuEl?.classList.add('is-under-focus');
        // next frame so CSS transition runs
        window.requestAnimationFrame(() => {
            focusEl.classList.add('is-visible');
            if (focusBackdrop && typeof focusBackdrop.focus === 'function') {
                focusBackdrop.focus();
            }
        });
        if (controls) controls.enabled = false;
    }

    function closeFocus() {
        if (!focusEl) return;
        focused = false;
        focusEl.classList.remove('is-visible');
        focusEl.removeAttribute('role');
        focusEl.removeAttribute('aria-modal');
        focusEl.removeAttribute('aria-label');
        layoutEl?.classList.remove('is-focused');
        menuEl?.classList.remove('is-under-focus');
        if (controls) controls.enabled = true;
        if (lastFocusEl && typeof lastFocusEl.focus === 'function') {
            lastFocusEl.focus();
        }
        lastFocusEl = null;
        window.clearTimeout(focusHideTimer);
        focusHideTimer = window.setTimeout(() => {
            if (!focusEl.classList.contains('is-visible')) {
                focusEl.hidden = true;
                if (focusPosterEl) focusPosterEl.removeAttribute('src');
            }
        }, 420);
    }

    function showCaption(index) {
        const p = POSTERS[index];
        if (!p) return;
        container.classList.add('is-stopped');
        openFocus(index);
        renderBlurb(p.explanations, p.footnotes);
    }

    function hideCaption() {
        container.classList.remove('is-stopped');
        hideBlurb();
        closeFocus();
    }

    function stopOnIndex(index) {
        const n = POSTERS.length;
        currentIndex = ((index % n) + n) % n;

        // Pick nearest equivalent angle so settle is short
        const desired = angleForIndex(currentIndex);
        const delta = normalizeAngle(desired - currentAngle);
        targetAngle = currentAngle + delta;

        spinning = false;
        settling = true;
        hideCaption();
    }

    function resumeSpin() {
        spinning = true;
        settling = false;
        hideCaption();
    }

    // Bake the exact home CSS filter into the texture (no separate shadow mesh → no smears)
    // filter: drop-shadow(0 2px 15px rgba(54,54,53,.25)) drop-shadow(0 4px 40px rgba(54,54,53,.35))
    function bakePosterWithHomeShadow(img) {
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;
        const maxEdge = 1200;
        const scale = Math.min(1, maxEdge / Math.max(w, h));
        w = Math.max(1, Math.round(w * scale));
        h = Math.max(1, Math.round(h * scale));

        const pad = 80; // room for blur 40 + offset 4
        const canvas = document.createElement('canvas');
        canvas.width = w + pad * 2;
        canvas.height = h + pad * 2;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter =
            'drop-shadow(0 2px 15px rgba(54, 54, 53, 0.25)) drop-shadow(0 4px 40px rgba(54, 54, 53, 0.35))';
        ctx.drawImage(img, pad, pad, w, h);
        ctx.filter = 'none';

        const texture = new THREE.CanvasTexture(canvas);
        if ('sRGBEncoding' in THREE) texture.encoding = THREE.sRGBEncoding;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.needsUpdate = true;

        return {
            texture: texture,
            worldW: POSTER_W * (canvas.width / w),
            worldH: POSTER_H * (canvas.height / h)
        };
    }

    function createPosterMesh(baked, index, total) {
        const group = new THREE.Group();

        // One flat plane only (DoubleSide). Shadow is baked into the texture —
        // avoids coplanar front/back ghosting and smear planes.
        const mat = new THREE.MeshBasicMaterial({
            map: baked.texture,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: true,
            fog: false
        });

        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(baked.worldW, baked.worldH),
            mat
        );
        mesh.position.y = MESH_Y_BASE;
        group.add(mesh);

        const angle = (index / total) * Math.PI * 2;
        group.position.set(
            Math.sin(angle) * RING_RADIUS,
            0,
            Math.cos(angle) * RING_RADIUS
        );
        group.rotation.y = angle;
        group.userData.index = index;
        group.userData.mesh = mesh;
        group.userData.windPhase = index * 1.73 + 0.4;

        return group;
    }

    function resolvePosterUrl(src) {
        // Prefer embedded data-URLs so file:// opening works (Chrome blocks local WebGL textures)
        const assets = window.MTF_GALLERY_ASSETS;
        if (assets) {
            const key = src.split('/').pop();
            if (assets[key]) return assets[key];
        }
        return src;
    }

    function loadTexture(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                try {
                    resolve(bakePosterWithHomeShadow(img));
                } catch (err) {
                    reject(err);
                }
            };
            img.onerror = () => reject(new Error('Failed to load poster'));
            img.src = resolvePosterUrl(url);
        });
    }

    async function loadTextures() {
        const results = await Promise.allSettled(POSTERS.map((p) => loadTexture(p.src)));
        const textures = [];
        const posters = [];
        results.forEach((result, i) => {
            if (result.status === 'fulfilled') {
                textures.push(result.value);
                posters.push(POSTERS[i]);
            } else {
                if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
                    console.warn(result.reason);
                }
            }
        });
        if (!textures.length) {
            throw new Error('Could not load posters');
        }
        POSTERS.length = 0;
        posters.forEach((p) => POSTERS.push(p));
        return textures;
    }

    function setupScene() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);
        scene.fog = null; // no fog fade (was reading as ghost/reflection artifacts)

        camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 80);
        // Outside + elevated: see front, sides, and backs of the ring
        camera.position.set(0, 4.6, 9.2);

        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.shadowMap.enabled = false;
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.NoToneMapping; // keep baked drop-shadow colors faithful
        container.appendChild(renderer.domElement);

        if (typeof THREE.OrbitControls !== 'undefined') {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.08;
            controls.enablePan = false;
            controls.enableZoom = true;
            controls.enableRotate = true;
            controls.minDistance = 5.5;
            controls.maxDistance = 18;
            controls.minPolarAngle = Math.PI * 0.22;
            controls.maxPolarAngle = Math.PI * 0.48;
            controls.target.set(0, POSTER_H * 0.45, 0);
            controls.zoomSpeed = 0.9;
            controls.rotateSpeed = 0.5;
            controls.update();
        } else {
            camera.lookAt(0, POSTER_H * 0.45, 0);
        }

        scene.add(new THREE.AmbientLight(0xffffff, 0.62));

        const key = new THREE.DirectionalLight(0xffffff, 1.05);
        key.position.set(4.5, 7.5, 5.5);
        scene.add(key);

        const fill = new THREE.DirectionalLight(0xfff8f0, 0.42);
        fill.position.set(-5, 3.5, -2);
        scene.add(fill);

        const rim = new THREE.DirectionalLight(0xffffff, 0.35);
        rim.position.set(-2, 4, -6);
        scene.add(rim);

        carouselGroup = new THREE.Group();
        scene.add(carouselGroup);

        clock = new THREE.Clock();
        _hitPointer = new THREE.Vector2();
        _hitRaycaster = new THREE.Raycaster();
    }

    function buildCarousel(textures) {
        textures.forEach((tex, i) => {
            const mesh = createPosterMesh(tex, i, textures.length);
            carouselGroup.add(mesh);
            posterMeshes.push(mesh);
        });
    }

    function onResize() {
        if (!camera || !renderer || !container) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    }

    function scheduleResize() {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(onResize, 100);
    }

    function animate() {
        if (document.hidden) {
            animRaf = 0;
            return;
        }
        animRaf = requestAnimationFrame(animate);

        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;

        if (spinning) {
            currentAngle -= SPIN_SPEED * dt;
        } else if (settling) {
            const diff = normalizeAngle(targetAngle - currentAngle);
            currentAngle += diff * Math.min(1, SETTLE_LERP * (1 + dt * 40));
            if (Math.abs(normalizeAngle(targetAngle - currentAngle)) < SETTLE_EPS) {
                currentAngle = targetAngle;
                settling = false;
                showCaption(currentIndex);
            }
        }

        carouselGroup.rotation.y = currentAngle;

        // Skip wind while focused — DOM poster is sharp; ring is only a blurred backdrop
        // Also skip continuous bobbing when the user prefers reduced motion
        if (!focused && !prefersReducedMotion) {
            for (let i = 0, n = posterMeshes.length; i < n; i++) {
                const g = posterMeshes[i];
                const mesh = g.userData.mesh;
                if (!mesh) continue;
                const p = g.userData.windPhase || 0;

                const bob =
                    Math.sin(t * 0.75 + p) * 0.07 +
                    Math.sin(t * 1.55 + p * 0.6) * 0.03;
                const windX =
                    Math.sin(t * 1.2 + p) * 0.045 +
                    Math.sin(t * 2.35 + p * 1.4) * 0.022;
                const windZ =
                    Math.sin(t * 0.95 + p * 0.85) * 0.032 +
                    Math.sin(t * 1.9 + p * 1.1) * 0.015;
                const windY = Math.sin(t * 1.35 + p * 0.7) * 0.028;

                mesh.position.y = MESH_Y_BASE + bob;
                mesh.rotation.x = windX;
                mesh.rotation.z = windZ;
                mesh.rotation.y = windY;
            }
        }

        if (controls && controls.enabled) controls.update();
        renderer.render(scene, camera);
    }

    function startAnimationLoop() {
        if (animRaf || document.hidden) return;
        clock.getDelta(); // reset large hidden-tab deltas
        animRaf = requestAnimationFrame(animate);
    }

    function hitPoster(clientX, clientY) {
        if (!_hitPointer || !_hitRaycaster || !renderer || !camera) return null;
        const rect = renderer.domElement.getBoundingClientRect();
        _hitPointer.set(
            ((clientX - rect.left) / rect.width) * 2 - 1,
            -((clientY - rect.top) / rect.height) * 2 + 1
        );
        _hitRaycaster.setFromCamera(_hitPointer, camera);
        const hits = _hitRaycaster.intersectObjects(posterMeshes, true);
        if (!hits.length) return null;
        let obj = hits[0].object;
        while (obj && obj.userData.index === undefined) obj = obj.parent;
        return obj && obj.userData.index !== undefined ? obj.userData.index : null;
    }

    function bindUI() {
        if (typeof window.bindSiteMenu === 'function') {
            siteMenu = window.bindSiteMenu();
        }

        renderer.domElement.addEventListener('pointerdown', (e) => {
            pointerDown = { x: e.clientX, y: e.clientY, id: e.pointerId };
            pointerMoved = false;
        });

        renderer.domElement.addEventListener('pointermove', (e) => {
            if (!pointerDown || pointerDown.id !== e.pointerId) return;
            const dx = e.clientX - pointerDown.x;
            const dy = e.clientY - pointerDown.y;
            if (dx * dx + dy * dy > 25) pointerMoved = true;
        });

        renderer.domElement.addEventListener('pointerup', (e) => {
            if (!pointerDown || pointerDown.id !== e.pointerId) return;
            const wasDrag = pointerMoved;
            pointerDown = null;
            pointerMoved = false;
            if (wasDrag) return; // orbit / zoom drag — keep spinning or stopped state

            const hit = hitPoster(e.clientX, e.clientY);
            if (hit !== null) {
                if (!spinning && !settling && hit === currentIndex) {
                    resumeSpin();
                } else {
                    stopOnIndex(hit);
                }
                return;
            }

            // Empty click: if stopped → resume; if spinning → stop on nearest
            if (!spinning && !settling) {
                resumeSpin();
            } else if (spinning) {
                stopOnIndex(indexFromAngle(currentAngle));
            }
        });

        if (btnResetCamera) {
            btnResetCamera.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!camera) return;
                camera.position.set(CAMERA_HOME.x, CAMERA_HOME.y, CAMERA_HOME.z);
                if (controls) {
                    controls.target.set(0, POSTER_H * 0.45, 0);
                    controls.update();
                } else {
                    camera.lookAt(0, POSTER_H * 0.45, 0);
                }
            });
        }

        if (btnAddPoster) {
            btnAddPoster.addEventListener('click', (e) => {
                e.stopPropagation();
                if (uploadPanel && !uploadPanel.hidden) {
                    closeUploadPanel();
                    return;
                }
                openUploadPanel();
            });
        }

        if (inputAddPoster) {
            inputAddPoster.addEventListener('change', () => {
                const file = inputAddPoster.files && inputAddPoster.files[0];
                if (!file) return;
                pendingImageFile = file;
                if (uploadImageName) uploadImageName.textContent = file.name;
                inputAddPoster.closest('.gallery-upload-image')?.classList.add('has-file');
                if (uploadTitle && !uploadTitle.value.trim()) {
                    uploadTitle.value = titleFromFilename(file.name);
                }
            });
        }

        if (btnAddContribution) {
            btnAddContribution.addEventListener('click', (e) => {
                e.stopPropagation();
                createContributionFields();
            });
        }

        if (inputAddTexts) {
            inputAddTexts.addEventListener('change', async () => {
                const files = Array.prototype.slice.call(inputAddTexts.files || []);
                for (let i = 0; i < files.length; i++) {
                    try {
                        const raw = await readTextFile(files[i]);
                        const parsed = parseTextContribution(raw, titleFromFilename(files[i].name));
                        if (parsed) createContributionFields(parsed);
                    } catch (err) {
                        console.warn(err);
                    }
                }
                inputAddTexts.value = '';
            });
        }

        if (btnUploadConfirm) {
            btnUploadConfirm.addEventListener('click', (e) => {
                e.stopPropagation();
                commitUpload();
            });
        }

        if (btnUploadCancel) {
            btnUploadCancel.addEventListener('click', (e) => {
                e.stopPropagation();
                closeUploadPanel();
            });
        }

        // Exit focus by clicking anywhere except footnote markers / footnote popup
        if (focusEl) {
            focusEl.addEventListener('click', (e) => {
                if (e.target.closest('.footnote') || e.target.closest('.footnote-popup')) return;
                e.stopPropagation();
                if (!spinning) resumeSpin();
            });
        }

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (siteMenu && siteMenu.isOpen()) return; // menu handler closes first
                if (uploadPanel && !uploadPanel.hidden) {
                    closeUploadPanel();
                    return;
                }
                if (!spinning) resumeSpin();
                return;
            }
            // Keyboard zoom shortcuts
            if (!controls || focused) return;
            if (e.key === '=' || e.key === '+') {
                camera.position.multiplyScalar(0.92);
                controls.update();
            }
            if (e.key === '-' || e.key === '_') {
                camera.position.multiplyScalar(1.08);
                controls.update();
            }
        });
    }

    async function boot() {
        if (typeof THREE === 'undefined') {
            console.error('WebGL unavailable');
            return;
        }

        setupScene();
        try {
            const textures = await loadTextures();
            buildCarousel(textures);
            updatePosterCounter();
            bindUI();
            window.addEventListener('resize', scheduleResize, { passive: true });
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) startAnimationLoop();
            });
            startAnimationLoop();
        } catch (err) {
            console.error(err);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
