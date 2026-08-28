(() => {
  'use strict';

  // 1. Scroll Animations with IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const fadeElements = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach((el) => fadeObserver.observe(el));
  } else {
    fadeElements.forEach((el) => el.classList.add('visible'));
  }

  /* ==========================================================================
     PRODUCT PAGE LOGIC (AI Search, Agent Simulator, Smart Workspace Insights)
     ========================================================================== */
  if (document.querySelector('.product-page')) {
    // 2. AI Search Interactive Demo
    const searchInput = document.getElementById('aiSearchInput');
    const searchBtn = document.getElementById('aiSearchBtn');
    const answerPanel = document.getElementById('aiAnswerPanel');

    const mockAnswers = {
      default: {
        header: '✦ Notion AI Answer',
        body: 'Our Q3 priorities focus on 3 core pillars: 1) Launching custom AI agents for enterprise workspaces, 2) Improving document search speed by 40%, and 3) Expanding automated workflow integrations with Slack and GitHub.',
        citations: ['Q3 Roadmap Document', 'Engineering Sync Notes (July 14)', 'Product Strategy Deck v2']
      }
    };

    function runAiSearch() {
      if (!answerPanel) return;
      const query = searchInput ? searchInput.value.trim() : '';
      answerPanel.style.opacity = '0.4';
      
      setTimeout(() => {
        answerPanel.style.opacity = '1';
        const ans = mockAnswers.default;
        answerPanel.querySelector('.ai-answer-body').textContent = ans.body;
        const chipContainer = answerPanel.querySelector('.citations-list');
        if (chipContainer) {
          chipContainer.innerHTML = '<strong>Sources:</strong> ' +
            ans.citations.map(c => `<span class="citation-chip">📄 ${c}</span>`).join(' ');
        }
      }, 300);
    }

    if (searchBtn) searchBtn.addEventListener('click', runAiSearch);
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') runAiSearch();
      });
    }

    // 3. Agent Simulation Demo
    const runAgentBtn = document.getElementById('runAgentBtn');
    const stepCards = document.querySelectorAll('.workflow-step-card');
    const agentOutput = document.getElementById('agentOutput');

    if (runAgentBtn) {
      runAgentBtn.addEventListener('click', () => {
        runAgentBtn.disabled = true;
        runAgentBtn.style.opacity = '0.6';
        
        // Reset steps
        stepCards.forEach(card => card.classList.remove('active', 'completed'));
        if (agentOutput) agentOutput.textContent = '[$] Initializing Agent runner context...\n';

        const sequence = [
          { step: 0, msg: '[$] Step 1/4: Analyzing workspace pages and active databases...\n' },
          { step: 1, msg: '[$] Step 2/2: Gathering project updates from 14 team members...\n' },
          { step: 2, msg: '[$] Step 3/4: Synthesizing weekly progress & blockers into Markdown...\n' },
          { step: 3, msg: '[$] Step 4/4: ✓ Report ready! Published to Teamspace #product-updates.\n' }
        ];

        sequence.forEach((item, index) => {
          setTimeout(() => {
            stepCards.forEach((c, idx) => {
              if (idx < item.step) {
                c.classList.remove('active');
                c.classList.add('completed');
              } else if (idx === item.step) {
                c.classList.add('active');
              }
            });
            if (agentOutput) agentOutput.textContent += item.msg;

            if (index === sequence.length - 1) {
              runAgentBtn.disabled = false;
              runAgentBtn.style.opacity = '1';
            }
          }, (index + 1) * 700);
        });
      });
    }

    // 4. Smart Workspace Insights Modal & Recommendation Engine
    const openModalBtn = document.getElementById('openInsightsModalBtn');
    const closeModalBtn = document.getElementById('closeInsightsModalBtn');
    const modalOverlay = document.getElementById('insightsModalOverlay');

    const healthScoreVal = document.getElementById('healthScoreVal');
    const coverageVal = document.getElementById('coverageVal');
    const taskVal = document.getElementById('taskVal');

    let currentHealth = 82;
    let currentCoverage = 71;
    let currentTask = 89;

    function toggleModal(show) {
      if (!modalOverlay) return;
      if (show) {
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    }

    if (openModalBtn) openModalBtn.addEventListener('click', () => toggleModal(true));
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => toggleModal(false));
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) toggleModal(false);
      });
    }

    // Recommendations apply / dismiss logic
    const recList = document.getElementById('recommendationsList');
    if (recList) {
      recList.addEventListener('click', (e) => {
        const applyBtn = e.target.closest('.rec-btn.apply');
        const dismissBtn = e.target.closest('.rec-btn.dismiss');
        const item = e.target.closest('.recommendation-item');

        if (!item) return;

        if (applyBtn) {
          item.classList.add('applied');
          applyBtn.textContent = '✓ Applied';
          applyBtn.disabled = true;
          applyBtn.style.background = '#22a06b';

          // Increment stats
          currentHealth = Math.min(100, currentHealth + 3);
          currentCoverage = Math.min(100, currentCoverage + 4);
          currentTask = Math.min(100, currentTask + 2);

          if (healthScoreVal) healthScoreVal.textContent = currentHealth + '%';
          if (coverageVal) coverageVal.textContent = currentCoverage + '%';
          if (taskVal) taskVal.textContent = currentTask + '%';
        } else if (dismissBtn) {
          item.classList.add('dismissed');
          setTimeout(() => {
            item.remove();
          }, 220);
        }
      });
    }
  }

  /* ==========================================================================
     RESOURCES PAGE LOGIC (Search, Category Filters, & Detail Modal)
     ========================================================================== */


  const resourcesData = [
    {
      id: 'res-1',
      title: "Build your team's knowledge hub",
      category: 'Guides',
      type: 'Guide',
      icon: '📘',
      desc: 'A practical step-by-step guide to organizing knowledge, projects, and cross-functional team workflows in one central workspace.',
      fullContent: 'Learn how leading tech teams migrate from fragmented wikis to a single system of record. Includes templates for Architecture Decision Records (ADRs), teamspace permission models, and Notion AI auto-tagging workflows.'
    },
    {
      id: 'res-2',
      title: 'Sprint Planning & Product Backlog Template',
      category: 'Templates',
      type: 'Template',
      icon: '🎯',
      desc: 'Ready-to-use Notion database template featuring Kanban views, sprint velocity rollups, and automated priority tags.',
      fullContent: 'Streamline your team sprints with pre-configured views for backlog grooming, daily standups, and retrospective notes. Fully customizable for Agile and Kanban frameworks.'
    },
    {
      id: 'res-3',
      title: 'Certified Notion Solution Consultants',
      category: 'Learning',
      type: 'Consultants',
      icon: '🤝',
      desc: 'Connect with expert Notion partners for custom workspace setup, team onboarding, and enterprise migration assistance.',
      fullContent: 'Our network of certified Notion experts can audit your existing workspace, build custom database integrations, and train your staff on AI workflows.'
    },
    {
      id: 'res-4',
      title: 'Official Notion Integration Connections',
      category: 'Templates',
      type: 'Connections',
      icon: '⚡',
      desc: 'Sync data seamlessly between Notion, GitHub, Slack, Jira, Figma, and Google Drive.',
      fullContent: 'Deep dive into 50+ native integrations. Automatically turn Slack messages into Notion tasks and link GitHub pull requests to product specs.'
    },
    {
      id: 'res-5',
      title: "What's New in Notion 2026",
      category: 'Blog',
      type: 'Product Updates',
      icon: '✨',
      desc: 'Explore custom AI agents, enhanced search speed, and instant workspace citations released in our latest update.',
      fullContent: 'Read about our newest release including background agent automation, custom database formulas v3, and enterprise security governance tools.'
    },
    {
      id: 'res-6',
      title: 'How Cursor Scales Engineering with Notion',
      category: 'Stories',
      type: 'Customer Story',
      icon: '🏢',
      desc: 'See how the Cursor team uses Notion AI to keep a fast-moving AI startup aligned with 0 management overhead.',
      fullContent: 'Cursor co-founder Michael Truell shares how combining code editor workflows with Notion AI docs gives their team an unfair speed advantage.'
    },
    {
      id: 'res-7',
      title: 'Mastering AI Workflows & Custom Agents',
      category: 'Webinars',
      type: 'Webinar',
      icon: '🎥',
      desc: 'Watch our 45-minute deep dive on configuring autonomous AI agents for automated status reports and support triage.',
      fullContent: 'Join Notion product leaders as they demonstrate live setup of trigger-action AI agents inside Notion databases.'
    },
    {
      id: 'res-8',
      title: 'Notion Developer Platform & REST API Docs',
      category: 'Learning',
      type: 'Developers',
      icon: '💻',
      desc: 'Complete reference documentation for building custom integrations, OAuth apps, and webhooks with the Notion API.',
      fullContent: 'Explore SDKs for JavaScript, Python, and Go. Includes interactive API playground, rate limit guidelines, and webhook payload specs.'
    },
    {
      id: 'res-9',
      title: 'Notion Academy: Workspace Fundamentals Course',
      category: 'Learning',
      type: 'Academy',
      icon: '🎓',
      desc: 'Free self-paced video courses for team members, workspace admins, and power users.',
      fullContent: 'Earn your Notion Essentials Certification. 12 video modules covering block basics, database relations, rollups, and formula syntax.'
    },
    {
      id: 'res-10',
      title: 'Interactive Product Tours & UI Demos',
      category: 'Guides',
      type: 'Product Tours',
      icon: '🧭',
      desc: 'Self-guided interactive walkthroughs demonstrating docs, wikis, projects, and AI features in action.',
      fullContent: 'Take a virtual tour of Notion features at your own pace. Practice creating database views and testing AI prompts live.'
    },
    {
      id: 'res-11',
      title: 'Notion Help Center & Community Forum',
      category: 'Learning',
      type: 'Help',
      icon: '❓',
      desc: 'Find instant troubleshooting articles, account billing FAQs, and community-contributed tips.',
      fullContent: 'Search thousands of verified support guides, check real-time system status, or ask questions in our global community Slack.'
    },
    {
      id: 'res-12',
      title: 'Faire Product Design System Guide',
      category: 'Stories',
      type: 'Customer Story',
      icon: '🎨',
      desc: 'How Faire maintains brand consistency across 200+ designers using central Notion component libraries.',
      fullContent: 'Learn how Faire Senior Director Renee Solorzano structured design tokens and component specs inside Notion for seamless design-to-engineering handoff.'
    }
  ];

  const searchInputRes = document.getElementById('resourcesSearchInput');
  const clearSearchBtnRes = document.getElementById('resourcesClearSearchBtn');
  const filterPillsRes = document.querySelectorAll('.filter-pill-btn');
  const resultsContainerRes = document.getElementById('resourcesDynamicResults');

  let activeCategoryRes = 'All';
  let searchQueryRes = '';

  function renderResources() {
    if (!resultsContainerRes) return;

    const filtered = resourcesData.filter(item => {
      const matchCategory = activeCategoryRes === 'All' || item.category === activeCategoryRes || item.type === activeCategoryRes;
      const query = searchQueryRes.toLowerCase().trim();
      const matchQuery = !query ||
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query);
      return matchCategory && matchQuery;
    });

    if (filtered.length === 0) {
      resultsContainerRes.innerHTML = `
        <div class="no-resources-found fade-up visible">
          <h3>No resources found matching "${searchQueryRes || activeCategoryRes}"</h3>
          <p>Try searching for terms like "developer", "guides", "templates", or "AI".</p>
          <button class="btn btn-secondary" id="resetFiltersBtn" type="button">Reset filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategoryRes = 'All';
          searchQueryRes = '';
          if (searchInputRes) searchInputRes.value = '';
          if (clearSearchBtnRes) clearSearchBtnRes.hidden = true;
          filterPillsRes.forEach(p => p.classList.toggle('active', p.dataset.category === 'All'));
          renderResources();
        });
      }
      return;
    }

    resultsContainerRes.innerHTML = filtered.map(item => `
      <div class="resource-card fade-up visible" data-resource-id="${item.id}">
        <div>
          <div class="resource-card-meta">
            <span class="tag blue">${item.category}</span>
            <span style="color: var(--text-subtle);">${item.type}</span>
          </div>
          <h3 style="margin-top: 12px;">${item.icon} ${item.title}</h3>
          <p style="margin-top: 8px;">${item.desc}</p>
        </div>
        <div class="resource-card-footer">
          <span>Explore resource</span>
          <span>→</span>
        </div>
      </div>
    `).join('');
  }

  // Initial render if container present
  if (resultsContainerRes) renderResources();

  // Search input listeners
  if (searchInputRes) {
    searchInputRes.addEventListener('input', (e) => {
      searchQueryRes = e.target.value;
      if (clearSearchBtnRes) clearSearchBtnRes.hidden = !searchQueryRes;
      renderResources();
    });
  }

  if (clearSearchBtnRes) {
    clearSearchBtnRes.addEventListener('click', () => {
      searchQueryRes = '';
      if (searchInputRes) searchInputRes.value = '';
      clearSearchBtnRes.hidden = true;
      renderResources();
    });
  }

  // Filter Pills listener
  filterPillsRes.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPillsRes.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategoryRes = pill.dataset.category || 'All';
      renderResources();
    });
  });

  // Resource Detail Modal Logic
  const resModalOverlay = document.getElementById('resourceModalOverlay');
  const resModalCloseBtn = document.getElementById('closeResourceModalBtn');
  const resModalTitle = document.getElementById('resModalTitle');
  const resModalCategory = document.getElementById('resModalCategory');
  const resModalDesc = document.getElementById('resModalDesc');
  const resModalBodyContent = document.getElementById('resModalBodyContent');

  function openResourceModal(item) {
    if (!resModalOverlay) return;
    if (resModalTitle) resModalTitle.textContent = `${item.icon} ${item.title}`;
    if (resModalCategory) resModalCategory.textContent = item.category;
    if (resModalDesc) resModalDesc.textContent = item.desc;
    if (resModalBodyContent) resModalBodyContent.textContent = item.fullContent;

    resModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeResourceModal() {
    if (!resModalOverlay) return;
    resModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (resModalCloseBtn) resModalCloseBtn.addEventListener('click', closeResourceModal);
  if (resModalOverlay) {
    resModalOverlay.addEventListener('click', (e) => {
      if (e.target === resModalOverlay) closeResourceModal();
    });
  }

  // Delegated click listener for resource cards (both static & dynamic)
  document.addEventListener('click', (e) => {
    const card = e.target.closest('[data-resource-id], .browse-card, .learn-card');
    if (!card) return;

    const resId = card.dataset.resourceId;
    let targetData = resourcesData.find(r => r.id === resId);

    if (!targetData) {
      // Fallback for static elements
      const titleEl = card.querySelector('h3, h4');
      const descEl = card.querySelector('p');
      targetData = {
        icon: '📑',
        title: titleEl ? titleEl.textContent : 'Notion Resource',
        category: 'Resources Hub',
        desc: descEl ? descEl.textContent : 'Detailed Notion workspace documentation and best practices.',
        fullContent: 'Explore comprehensive guides, templates, and video tutorials to unlock peak team productivity with Notion.'
      };
    }

    openResourceModal(targetData);
  });

  /* ==========================================================================
     DEVELOPER PLATFORM PAGE INTERACTIONS
     ========================================================================== */
  if (document.querySelector('.dev-platform-page')) {
    // 1. Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('.dev-cli-copy, .dev-footer-copy');
    copyButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const textToCopy = btn.dataset.copy || 'curl -fsSL https://ntn.dev | bash';
        try {
          await navigator.clipboard.writeText(textToCopy);
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<span style="font-size:12px;">✓</span>';
          setTimeout(() => {
            btn.innerHTML = originalHTML;
          }, 2000);
        } catch (err) {
          console.error('Copy failed:', err);
        }
      });
    });

    // 2. Tool tabs interaction
    const toolTabs = document.querySelectorAll('.dev-tool-tab');
    const toolPanels = document.querySelectorAll('.dev-tool-panel');
    
    toolTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const toolType = tab.dataset.tool;
        
        // Update active tab
        toolTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active panel
        toolPanels.forEach(panel => {
          if (panel.dataset.content === toolType) {
            panel.classList.add('active');
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });

    // 3. Duplicate ticker items for seamless loop
    const tickerTracks = document.querySelectorAll('.dev-ticker-track');
    tickerTracks.forEach(track => {
      const items = track.innerHTML;
      track.innerHTML = items + items; // Duplicate for seamless loop
    });

    // 4. Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.dev-nav-link[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // 5. Mobile navigation toggle
    const mobileToggle = document.querySelector('.dev-nav-mobile-toggle');
    const navCenter = document.querySelector('.dev-nav-center');
    
    if (mobileToggle && navCenter) {
      mobileToggle.addEventListener('click', () => {
        navCenter.style.display = navCenter.style.display === 'flex' ? 'none' : 'flex';
        if (navCenter.style.display === 'flex') {
          navCenter.style.position = 'absolute';
          navCenter.style.top = '64px';
          navCenter.style.left = '0';
          navCenter.style.right = '0';
          navCenter.style.background = '#ffffff';
          navCenter.style.flexDirection = 'column';
          navCenter.style.padding = '24px';
          navCenter.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        }
      });
    }
  }

  /* ==========================================================================
     STARTUPS PAGE INTERACTIONS
     ========================================================================== */
  if (document.querySelector('.startups-page')) {
    // 1. Savings Calculator Logic (12 tools)
    const toolCheckboxes = document.querySelectorAll('.calc-cb');
    const teamInput = document.getElementById('calcTeamInput');
    const monthlyVal = document.getElementById('calcMonthlyOutput');
    const annualVal = document.getElementById('calcAnnualOutput');

    function updateCalculator() {
      if (!teamInput || !monthlyVal || !annualVal) return;
      let teamSize = parseInt(teamInput.value, 10) || 10;
      teamSize = Math.max(1, Math.min(500, teamSize));

      let pricePerUser = 0;
      toolCheckboxes.forEach(cb => {
        if (cb.checked) {
          pricePerUser += parseInt(cb.value, 10) || 0;
        }
      });

      const monthlyTotal = pricePerUser * teamSize;
      const annualTotal = monthlyTotal * 12;

      monthlyVal.textContent = '$' + monthlyTotal.toLocaleString();
      annualVal.textContent = '$' + annualTotal.toLocaleString();
    }

    if (toolCheckboxes.length > 0 && teamInput) {
      toolCheckboxes.forEach(cb => cb.addEventListener('change', updateCalculator));
      teamInput.addEventListener('input', updateCalculator);
      updateCalculator();
    }

    // 2. Startup Journey Kombi Tab Switcher
    const kombiBlocks = document.querySelectorAll('.kombi-block');
    const kombiDisplayCanvas = document.getElementById('kombiDisplayCanvas');

    const kombiContent = {
      ideate: '<img class="kombi-slide-img" alt="Ideate - Notion Canvas" src="https://images.ctfassets.net/spoqsaf9291f/4YbEemGbTfMzNRSG6Gkuu2/dd819efa5f66dee6f9a76589531688f6/image.png" />',
      fundraise: '<img class="kombi-slide-img" alt="Fundraise - Notion Canvas" src="https://images.ctfassets.net/spoqsaf9291f/2qNLQF2lStyDOu7nUUMip5/774d0149e8869b724e35fa50efa77e45/fundraiser-tracker-template.webp" />',
      build: '<img class="kombi-slide-img" alt="Build - Notion Canvas" src="https://images.ctfassets.net/spoqsaf9291f/3VlzrufHCFHdpiXg4CNmCY/61162aa37e95ec22c0d0190ac897d748/product.png" />',
      launch: '<img class="kombi-slide-img" alt="Launch - Notion Canvas" src="https://images.ctfassets.net/spoqsaf9291f/oZ3KY4vWtnbYquqcOACkB/b7e1a9413c03fe8630052b20930905ac/product-launch-brief-notion-desktop.webp" />',
      scale: '<img class="kombi-slide-img" alt="Scale - Notion Canvas" src="https://images.ctfassets.net/spoqsaf9291f/3E3jQa1xh3nqdR6x29B8M1/d6997ecf3586c14acf1d9d9eda92773c/scale-hero.png" />'
    };

    if (kombiBlocks.length > 0 && kombiDisplayCanvas) {
      kombiBlocks.forEach(btn => {
        btn.addEventListener('click', () => {
          kombiBlocks.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const stage = btn.dataset.stage || 'ideate';
          if (kombiContent[stage]) {
            kombiDisplayCanvas.innerHTML = kombiContent[stage];
          }
        });
      });
    }

    // 3. FAQ Accordion
    const faqDetails = document.querySelectorAll('.faq-toggles-wrapper details');
    faqDetails.forEach(d => {
      d.addEventListener('toggle', () => {
        if (d.open) {
          faqDetails.forEach(other => {
            if (other !== d) other.open = false;
          });
        }
      });
    });
  }
})();

