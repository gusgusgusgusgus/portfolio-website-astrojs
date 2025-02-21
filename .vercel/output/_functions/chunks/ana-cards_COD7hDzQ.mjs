const anaCards = new Proxy({"src":"/_astro/ana-cards.DL98Pqhl.jpg","width":298,"height":171,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/augustinseminel/Documents/Code/projet-portfolio/portfolio-website/src/images/contributions/ana-cards.jpg";
							}
							
							return target[name];
						}
					});

export { anaCards as default };
