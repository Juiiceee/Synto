// lib/mock-data/index.js
export const products = [
  // DEFI TOOLS (5)
  {
    id: 'tool-1',
    handle: 'sonic-sender',
    availableForSale: true,
    title: 'Sonic Sender Pro',
    description: 'Seamlessly transfer crypto assets on Sonic blockchain with advanced natural language processing. Simply type "send 0.5 SONIC to John" and let the AI handle the complex transaction details, gas optimization, and security verification.',
    descriptionHtml: '<p>Seamlessly transfer crypto assets on Sonic blockchain with advanced natural language processing. Simply type "send 0.5 SONIC to John" and let the AI handle the complex transaction details, gas optimization, and security verification.</p><ul><li>Gas-optimized transactions</li><li>Customizable security checks</li><li>Multiple token support</li><li>Transaction history analysis</li><li>Smart suggestions for improved efficiency</li></ul>',
    creator: '@sonicmaster',
    downloads: 8749,
    rating: 4.8,
    reviewCount: 342,
    options: [
      {
        id: 'option-1',
        name: 'Version',
        values: ['Standard', 'Enterprise']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '0.8',
        currencyCode: 'SONIC'
      },
      minVariantPrice: {
        amount: '0.3',
        currencyCode: 'SONIC'
      }
    },
    variants: [
      {
        id: 'variant-1',
        title: 'Standard',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Standard'
          }
        ],
        price: {
          amount: '0.3',
          currencyCode: 'SONIC'
        }
      },
      {
        id: 'variant-2',
        title: 'Enterprise',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Enterprise'
          }
        ],
        price: {
          amount: '0.8',
          currencyCode: 'SONIC'
        }
      },
    ],
    featuredImage: {
      url: '/nft/1.jpeg',
      altText: 'Sonic Sender Pro',
      width: 600,
      height: 400
    },
    images: [
      {
        url: '/nft/1.jpeg',
        altText: 'Sonic Sender Pro',
        width: 600,
        height: 400
      }
    ],
    seo: {
      title: 'Sonic Sender Pro - AI-Powered Crypto Transfer Tool',
      description: 'Send crypto on Sonic blockchain with natural language commands and advanced security features.'
    },
    tags: ['defi', 'transfers', 'payment', 'premium'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tool-2',
    handle: 'sonic-swap-genius',
    availableForSale: true,
    title: 'Sonic Swap Genius',
    description: 'Revolutionary AI-powered token swapping with unparalleled market intelligence. Analyze liquidity pools in real-time, receive price slippage predictions, and execute swaps at the optimal moment with MEV protection built-in. Our proprietary algorithm scans hundreds of routes to find the most profitable path for your tokens.',
    descriptionHtml: '<p>Revolutionary AI-powered token swapping with unparalleled market intelligence. Analyze liquidity pools in real-time, receive price slippage predictions, and execute swaps at the optimal moment with MEV protection built-in.</p><p>Our proprietary algorithm scans hundreds of routes to find the most profitable path for your tokens, saving you up to 15% compared to standard DEX aggregators.</p><ul><li>MEV protection against front-running</li><li>Multi-route pathfinding</li><li>Slippage optimization</li><li>Gas cost minimization</li><li>Historical performance tracking</li></ul>',
    creator: '@swapwizard',
    downloads: 12563,
    rating: 4.9,
    reviewCount: 876,
    options: [
      {
        id: 'option-2',
        name: 'Version',
        values: ['Standard', 'Premium']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '0.95',
        currencyCode: 'SONIC'
      },
      minVariantPrice: {
        amount: '0.45',
        currencyCode: 'SONIC'
      }
    },
    variants: [
      {
        id: 'variant-3',
        title: 'Standard',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Standard'
          }
        ],
        price: {
          amount: '0.45',
          currencyCode: 'SONIC'
        }
      },
      {
        id: 'variant-4',
        title: 'Premium',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Premium'
          }
        ],
        price: {
          amount: '0.95',
          currencyCode: 'SONIC'
        }
      }
    ],
    featuredImage: {
      url: '/nft/2.jpeg',
      altText: 'Sonic Swap Genius',
      width: 600,
      height: 400
    },
    images: [
      {
        url: '/nft/2.jpeg',
        altText: 'Sonic Swap Genius',
        width: 600,
        height: 400
      }
    ],
    seo: {
      title: 'Sonic Swap Genius - Intelligent Token Exchange',
      description: 'AI-powered DEX aggregator with MEV protection and optimized swap routing.'
    },
    tags: ['defi', 'exchange', 'swap', 'trending'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tool-3',
    handle: 'contact-vault',
    availableForSale: true,
    title: 'Contact Vault',
    description: 'Revolutionize your crypto address management with Contact Vault. This AI-powered tool creates a secure, personalized address book for your Sonic wallet. Assign human-readable names to any blockchain address and send funds with just a contact name. The integrated identity verification system provides confidence ratings for each contact, protecting you from scams and ensuring your funds reach the right destination.',
    descriptionHtml: '<p>Revolutionize your crypto address management with Contact Vault. This AI-powered tool creates a secure, personalized address book for your Sonic wallet.</p><p>Assign human-readable names to any blockchain address and send funds with just a contact name. The integrated identity verification system provides confidence ratings for each contact, protecting you from scams and ensuring your funds reach the right destination.</p><h3>Key Features</h3><ul><li>ENS/DNS integration for automatic contact resolution</li><li>Contact risk scoring</li><li>Transaction history per contact</li><li>Group contacts by categories</li><li>Contact sharing with trusted connections</li><li>Multi-chain contact syncing</li></ul>',
    creator: '@contactpro',
    downloads: 6372,
    rating: 4.7,
    reviewCount: 429,
    options: [
      {
        id: 'option-3',
        name: 'Version',
        values: ['Basic', 'Premium']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '0.6',
        currencyCode: 'SONIC'
      },
      minVariantPrice: {
        amount: '0.25',
        currencyCode: 'SONIC'
      }
    },
    variants: [
      {
        id: 'variant-5',
        title: 'Basic',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Basic'
          }
        ],
        price: {
          amount: '0.25',
          currencyCode: 'SONIC'
        }
      },
      {
        id: 'variant-6',
        title: 'Premium',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Premium'
          }
        ],
        price: {
          amount: '0.6',
          currencyCode: 'SONIC'
        }
      }
    ],
    featuredImage: {
      url: '/nft/3.jpeg',
      altText: 'Contact Vault',
      width: 600,
      height: 400
    },
    images: [
      {
        url: '/nft/3.jpeg',
        altText: 'Contact Vault',
        width: 600,
        height: 400
      }
    ],
    seo: {
      title: 'Contact Vault - Secure Crypto Address Book',
      description: 'Manage crypto addresses with human-readable names and advanced security verification.'
    },
    tags: ['defi', 'security', 'contacts', 'management'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tool-4',
    handle: 'limit-hunter',
    availableForSale: true,
    title: 'Limit Hunter',
    description: 'Revolutionary AI-powered limit order system for the Sonic DEX that never sleeps. Set sophisticated conditional orders that execute precisely when market conditions are right. Limit Hunter continuously monitors price feeds across multiple exchanges and uses predictive modeling to anticipate price movements, allowing you to set orders that would be impossible on traditional DEXs.',
    descriptionHtml: '<p>Revolutionary AI-powered limit order system for the Sonic DEX that never sleeps. Set sophisticated conditional orders that execute precisely when market conditions are right.</p><p>Limit Hunter continuously monitors price feeds across multiple exchanges and uses predictive modeling to anticipate price movements, allowing you to set orders that would be impossible on traditional DEXs.</p><h3>Advanced Features</h3><ul><li>Multi-condition triggers (price, volume, volatility)</li><li>Trailing stop-loss orders</li><li>Time-based execution windows</li><li>Flash crash protection</li><li>Gas-optimization timing</li><li>Partial order execution logic</li><li>MEV-resistant transaction routing</li></ul>',
    creator: '@tradingmaster',
    downloads: 5823,
    rating: 4.6,
    reviewCount: 312,
    options: [
      {
        id: 'option-4',
        name: 'Version',
        values: ['Trader', 'Professional']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '1.2',
        currencyCode: 'SONIC'
      },
      minVariantPrice: {
        amount: '0.5',
        currencyCode: 'SONIC'
      }
    },
    variants: [
      {
        id: 'variant-7',
        title: 'Trader',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Trader'
          }
        ],
        price: {
          amount: '0.5',
          currencyCode: 'SONIC'
        }
      },
      {
        id: 'variant-8',
        title: 'Professional',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Professional'
          }
        ],
        price: {
          amount: '1.2',
          currencyCode: 'SONIC'
        }
      }
    ],
    featuredImage: {
      url: '/nft/4.jpeg',
      altText: 'Limit Hunter',
      width: 600,
      height: 400
    },
    images: [
      {
        url: '/nft/4.jpeg',
        altText: 'Limit Hunter',
        width: 600,
        height: 400
      }
    ],
    seo: {
      title: 'Limit Hunter - Advanced DEX Limit Orders',
      description: 'AI-powered limit orders and conditional trading for Sonic DEX.'
    },
    tags: ['defi', 'trading', 'orders', 'trending'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tool-5',
    handle: 'yield-optimizer',
    availableForSale: true,
    title: 'Yield Optimizer',
    description: 'Maximize your passive income with Yield Optimizer, the most sophisticated yield farming assistant on Sonic. Our proprietary AI continually scans all liquidity pools, lending platforms, and staking opportunities to dynamically allocate your assets for optimal returns while respecting your risk tolerance. The tool automatically detects impermanent loss risks and can re-balance your portfolio in response to changing market conditions.',
    descriptionHtml: '<p>Maximize your passive income with Yield Optimizer, the most sophisticated yield farming assistant on Sonic. Our proprietary AI continually scans all liquidity pools, lending platforms, and staking opportunities to dynamically allocate your assets for optimal returns while respecting your risk tolerance.</p><p>The tool automatically detects impermanent loss risks and can re-balance your portfolio in response to changing market conditions.</p><h3>Key Capabilities</h3><ul><li>Auto-compounding for maximized APY</li><li>Risk-adjusted return scoring</li><li>Impermanent loss protection</li><li>Multi-strategy deployment</li><li>Gas-efficient rebalancing</li><li>Historical yield performance analytics</li><li>Protocol risk assessment</li><li>Tax-optimized farming</li></ul>',
    creator: '@yieldninja',
    downloads: 9274,
    rating: 4.9,
    reviewCount: 673,
    options: [
      {
        id: 'option-5',
        name: 'Version',
        values: ['Standard', 'Whale']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '1.5',
        currencyCode: 'SONIC'
      },
      minVariantPrice: {
        amount: '0.7',
        currencyCode: 'SONIC'
      }
    },
    variants: [
      {
        id: 'variant-9',
        title: 'Standard',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Standard'
          }
        ],
        price: {
          amount: '0.7',
          currencyCode: 'SONIC'
        }
      },
      {
        id: 'variant-10',
        title: 'Whale',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Whale'
          }
        ],
        price: {
          amount: '1.5',
          currencyCode: 'SONIC'
        }
      }
    ],
    featuredImage: {
      url: '/nft/5.jpeg',
      altText: 'Yield Optimizer',
      width: 600,
      height: 400
    },
    images: [
      {
        url: '/nft/5.jpeg',
        altText: 'Yield Optimizer',
        width: 600,
        height: 400
      }
    ],
    seo: {
      title: 'Yield Optimizer - Intelligent Yield Farming',
      description: 'AI-powered yield farming optimization with automatic rebalancing and risk management.'
    },
    tags: ['defi', 'yield', 'farming', 'optimization'],
    updatedAt: new Date().toISOString()
  },

  // ANALYTICS TOOLS (3)
  {
    id: 'tool-6',
    handle: 'crypto-insights',
    availableForSale: true,
    title: 'Crypto Insights Pro',
    description: 'The most comprehensive crypto analysis tool powered by advanced machine learning. Crypto Insights Pro provides deep fundamental and technical analysis of any cryptocurrency with predictive market modeling. The tool analyzes on-chain data, social sentiment, developer activity, whale movements, and market correlations to deliver actionable intelligence that goes far beyond basic price charts.',
    descriptionHtml: '<p>The most comprehensive crypto analysis tool powered by advanced machine learning. Crypto Insights Pro provides deep fundamental and technical analysis of any cryptocurrency with predictive market modeling.</p><p>The tool analyzes on-chain data, social sentiment, developer activity, whale movements, and market correlations to deliver actionable intelligence that goes far beyond basic price charts.</p><h3>Comprehensive Analysis Features</h3><ul><li>On-chain health metrics (active addresses, transaction volume, etc.)</li><li>Developer activity tracking (GitHub metrics, network upgrades)</li><li>Social sentiment analysis across Twitter, Reddit, Discord</li><li>Whale wallet monitoring with unusual activity alerts</li><li>Exchange inflow/outflow tracking</li><li>Advanced technical indicators with machine learning enhancements</li><li>Correlation analysis with BTC, SONIC, and traditional markets</li><li>Risk/reward profiles based on historical volatility</li><li>Price projections with confidence intervals</li></ul>',
    creator: '@cryptoanalytica',
    downloads: 15742,
    rating: 4.9,
    reviewCount: 1247,
    options: [
      {
        id: 'option-6',
        name: 'Version',
        values: ['Trader', 'Institutional']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '2.0',
        currencyCode: 'SONIC'
      },
      minVariantPrice: {
        amount: '0.8',
        currencyCode: 'SONIC'
      }
    },
    variants: [
      {
        id: 'variant-11',
        title: 'Trader',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Trader'
          }
        ],
        price: {
          amount: '0.8',
          currencyCode: 'SONIC'
        }
      },
      {
        id: 'variant-12',
        title: 'Institutional',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Institutional'
          }
        ],
        price: {
          amount: '2.0',
          currencyCode: 'SONIC'
        }
      }
    ],
    featuredImage: {
      url: '/nft/6.jpeg',
      altText: 'Crypto Insights Pro',
      width: 600,
      height: 400
    },
    images: [
      {
        url: '/nft/6.jpeg',
        altText: 'Crypto Insights Pro',
        width: 600,
        height: 400
      }
    ],
    seo: {
      title: 'Crypto Insights Pro - Advanced Cryptocurrency Analysis',
      description: 'Comprehensive crypto analysis with machine learning-powered market predictions.'
    },
    tags: ['analytics', 'trading', 'research', 'trending'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tool-7',
    handle: 'portfolio-intelligence',
    availableForSale: true,
    title: 'Portfolio Intelligence',
    description: 'Transform your crypto investment strategy with Portfolio Intelligence, the most sophisticated portfolio analysis and optimization tool available on Sonic. This powerful tool creates a comprehensive view of your holdings across all wallets and exchanges, then applies advanced quantitative mSONICods to analyze risk exposure, correlation factors, and optimal asset allocation based on your investment goals.',
    descriptionHtml: '<p>Transform your crypto investment strategy with Portfolio Intelligence, the most sophisticated portfolio analysis and optimization tool available on Sonic. This powerful tool creates a comprehensive view of your holdings across all wallets and exchanges, then applies advanced quantitative mSONICods to analyze risk exposure, correlation factors, and optimal asset allocation based on your investment goals.</p><h3>Advanced Portfolio Management Features</h3><ul><li>Cross-chain portfolio tracking and visualization</li><li>Modern Portfolio Theory optimization</li><li>Risk factor decomposition (market, sector, token-specific)</li><li>Performance attribution analysis</li><li>Tax-loss harvesting opportunities</li><li>Correlation heat maps</li><li>Volatility and drawdown analysis</li><li>Scenario testing and stress simulation</li><li>Custom benchmark creation and tracking</li><li>Automatic portfolio rebalancing recommendations</li></ul>',
    creator: '@portfoliomaster',
    downloads: 8937,
    rating: 4.8,
    reviewCount: 742,
    options: [
      {
        id: 'option-7',
        name: 'Version',
        values: ['Personal', 'Family Office']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '1.8',
        currencyCode: 'SONIC'
      },
      minVariantPrice: {
        amount: '0.75',
        currencyCode: 'SONIC'
      }
    },
    variants: [
      {
        id: 'variant-13',
        title: 'Personal',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Personal'
          }
        ],
        price: {
          amount: '0.75',
          currencyCode: 'SONIC'
        }
      },
      {
        id: 'variant-14',
        title: 'Family Office',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Family Office'
          }
        ],
        price: {
          amount: '1.8',
          currencyCode: 'SONIC'
        }
      }
    ],
    featuredImage: {
      url: '/nft/7.jpeg',
      altText: 'Portfolio Intelligence',
      width: 600,
      height: 400
    },
    images: [
      {
        url: '/nft/7.jpeg',
        altText: 'Portfolio Intelligence',
        width: 600,
        height: 400
      }
    ],
    seo: {
      title: 'Portfolio Intelligence - Advanced Crypto Portfolio Analytics',
      description: 'AI-powered portfolio analysis and optimization with risk management and performance metrics.'
    },
    tags: ['analytics', 'portfolio', 'investment', 'optimization'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tool-8',
    handle: 'defi-pulse',
    availableForSale: true,
    title: 'DeFi Pulse',
    description: 'The ultimate DeFi ecosystem analytics platform for the Sonic blockchain. DeFi Pulse provides unprecedented visibility into liquidity pools, lending markets, yield farming opportunities, and protocol health metrics. Our AI constantly monitors the entire ecosystem to identify emerging trends, potential risks, and lucrative opportunities before they become widely known.',
    descriptionHtml: '<p>The ultimate DeFi ecosystem analytics platform for the Sonic blockchain. DeFi Pulse provides unprecedented visibility into liquidity pools, lending markets, yield farming opportunities, and protocol health metrics.</p><p>Our AI constantly monitors the entire ecosystem to identify emerging trends, potential risks, and lucrative opportunities before they become widely known.</p><h3>Comprehensive DeFi Analytics</h3><ul><li>Real-time TVL tracking across all protocols</li><li>Liquidity depth analysis and visualization</li><li>Lending market health indicators</li><li>Interest rate trend forecasting</li><li>Collateralization ratio monitoring</li><li>Protocol risk scoring based on audits, exploits history</li><li>Governance proposal tracking and impact analysis</li><li>Flash loan and MEV activity monitoring</li><li>Yield strategy comparison engine</li><li>Correlated risk exposure mapping</li></ul>',
    creator: '@defianalytica',
    downloads: 7563,
    rating: 4.7,
    reviewCount: 615,
    options: [
      {
        id: 'option-8',
        name: 'Version',
        values: ['Standard', 'Professional']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '1.2',
        currencyCode: 'SONIC'
      },
      minVariantPrice: {
        amount: '0.6',
        currencyCode: 'SONIC'
      }
    },
    variants: [
      {
        id: 'variant-15',
        title: 'Standard',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Standard'
          }
        ],
        price: {
          amount: '0.6',
          currencyCode: 'SONIC'
        }
      },
      {
        id: 'variant-16',
        title: 'Professional',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Professional'
          }
        ],
        price: {
          amount: '1.2',
          currencyCode: 'SONIC'
        }
      }
    ],
    featuredImage: {
      url: '/nft/8.jpeg',
      altText: 'DeFi Pulse',
      width: 600,
      height: 400
    },
    images: [
      {
        url: '/nft/8.jpeg',
        altText: 'DeFi Pulse',
        width: 600,
        height: 400
      }
    ],
    seo: {
      title: 'DeFi Pulse - Comprehensive DeFi Analytics',
      description: 'AI-powered analytics for DeFi protocols, yields, and ecosystem health.'
    },
    tags: ['analytics', 'defi', 'ecosystem', 'trending'],
    updatedAt: new Date().toISOString()
  },

  // UTILITY TOOLS (2)
  {
    id: 'tool-9',
    handle: 'nft-navigator',
    availableForSale: true,
    title: 'NFT Navigator',
    description: 'The ultimate NFT management and discovery tool for the Sonic blockchain. NFT Navigator uses computer vision AI to analyze visual attributes, rarity patterns, and market trends across NFT collections. Discover hidden gems, track your collection value, and receive alerts for undervalued assets or ideal selling opportunities. The tool integrates with major marketplaces for seamless buying, selling, and floor price monitoring.',
    descriptionHtml: '<p>The ultimate NFT management and discovery tool for the Sonic blockchain. NFT Navigator uses computer vision AI to analyze visual attributes, rarity patterns, and market trends across NFT collections.</p><p>Discover hidden gems, track your collection value, and receive alerts for undervalued assets or ideal selling opportunities. The tool integrates with major marketplaces for seamless buying, selling, and floor price monitoring.</p><h3>Advanced NFT Features</h3><ul><li>Visual similarity search across collections</li><li>Rarity scoring with trait analysis</li><li>Price prediction modeling</li><li>Holistic collection valuation</li><li>Whale wallet monitoring</li><li>Listing/delisting alerts for watched collections</li><li>Historical pricing visualization</li><li>Multi-marketplace aggregation</li><li>Portfolio performance tracking</li><li>NFT-collateralized loan monitoring</li></ul>',
    creator: '@nftvisionary',
    downloads: 12485,
    rating: 4.8,
    reviewCount: 934,
    options: [
      {
        id: 'option-9',
        name: 'Version',
        values: ['Collector', 'Trader']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '1.0',
        currencyCode: 'SONIC'
      },
      minVariantPrice: {
        amount: '0.5',
        currencyCode: 'SONIC'
      }
    },
    variants: [
      {
        id: 'variant-17',
        title: 'Collector',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Collector'
          }
        ],
        price: {
          amount: '0.5',
          currencyCode: 'SONIC'
        }
      },
      {
        id: 'variant-18',
        title: 'Trader',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Trader'
          }
        ],
        price: {
          amount: '1.0',
          currencyCode: 'SONIC'
        }
      }
    ],
    featuredImage: {
      url: '/nft/9.jpeg',
      altText: 'NFT Navigator',
      width: 600,
      height: 400
    },
    images: [
      {
        url: '/nft/9.jpeg',
        altText: 'NFT Navigator',
        width: 600,
        height: 400
      }
    ],
    seo: {
      title: 'NFT Navigator - Advanced NFT Management and Discovery',
      description: 'AI-powered NFT analysis, portfolio management, and market discovery tool.'
    },
    tags: ['utility', 'nfts', 'collections', 'trending'],
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tool-10',
    handle: 'gas-optimizer',
    availableForSale: true,
    title: 'Gas Optimizer',
    description: 'Revolutionary gas optimization tool that can save you up to 85% on transaction fees. Gas Optimizer uses predictive machine learning to identify optimal transaction windows and employs advanced contract optimization techniques to minimize gas consumption. The tool simulates transactions before submission to find the most efficient execution path and can bundle multiple operations into a single transaction when beneficial.',
    descriptionHtml: '<p>Revolutionary gas optimization tool that can save you up to 85% on transaction fees. Gas Optimizer uses predictive machine learning to identify optimal transaction windows and employs advanced contract optimization techniques to minimize gas consumption.</p><p>The tool simulates transactions before submission to find the most efficient execution path and can bundle multiple operations into a single transaction when beneficial.</p><h3>Gas Saving Features</h3><ul><li>Gas price prediction with 94% accuracy</li><li>Optimal timing recommendation</li><li>Transaction batching optimization</li><li>Smart contract interaction efficiency analysis</li><li>Mempool monitoring for network congestion</li><li>EIP-1559 base fee tracking</li><li>Priority fee optimization</li><li>Gas limit precision setting</li><li>Historical gas usage analytics</li><li>Weekly gas saving reports</li></ul>',
    creator: '@gasmaster',
    downloads: 18732,
    rating: 4.9,
    reviewCount: 1534,
    options: [
      {
        id: 'option-10',
        name: 'Version',
        values: ['Standard', 'Ultra']
      }
    ],
    priceRange: {
      maxVariantPrice: {
        amount: '0.9',
        currencyCode: 'SONIC'
      },
      minVariantPrice: {
        amount: '0.4',
        currencyCode: 'SONIC'
      }
    },
    variants: [
      {
        id: 'variant-19',
        title: 'Standard',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Standard'
          }
        ],
        price: {
          amount: '0.4',
          currencyCode: 'SONIC'
        }
      },
      {
        id: 'variant-20',
        title: 'Ultra',
        availableForSale: true,
        selectedOptions: [
          {
            name: 'Version',
            value: 'Ultra'
          }
        ],
        price: {
          amount: '0.9',
          currencyCode: 'SONIC'
        }
      }
    ],
    featuredImage: {
      url: '/nft/10.jpeg',
      altText: 'Gas Optimizer',
      width: 600,
      height: 400
    },
    images: [
      {
        url: '/nft/10.jpeg',
        altText: 'Gas Optimizer',
        width: 600,
        height: 400
      }
    ],
    seo: {
      title: 'Gas Optimizer - Advanced Transaction Fee Optimization',
      description: 'AI-powered gas fee optimization with predictive timing and contract efficiency analysis.'
    },
    tags: ['utility', 'gas', 'efficiency', 'trending'],
    updatedAt: new Date().toISOString()
  }
];

export const collections = [
  {
    handle: 'defi-tools',
    title: 'DeFi Tools',
    description: 'Powerful financial tools for the Sonic blockchain',
    seo: {
      title: 'DeFi Tools for Sonic',
      description: 'Enhance your agent with powerful decentralized finance capabilities'
    },
    updatedAt: new Date().toISOString(),
    path: '/shop/search/defi-tools'
  },
  {
    handle: 'analytics-tools',
    title: 'Analytics Tools',
    description: 'Deep insights and market intelligence tools',
    seo: {
      title: 'Analytics Tools for Sonic',
      description: 'Gain powerful insights with AI-powered analytics for Sonic blockchain'
    },
    updatedAt: new Date().toISOString(),
    path: '/shop/search/analytics-tools'
  },
  {
    handle: 'utility-tools',
    title: 'Utility Tools',
    description: 'Essential utilities to enhance your Sonic experience',
    seo: {
      title: 'Utility Tools for Sonic',
      description: 'Must-have utilities to improve your Sonic blockchain experience'
    },
    updatedAt: new Date().toISOString(),
    path: '/shop/search/utility-tools'
  }
];

export const menus = {
  'next-js-frontend-header-menu': [
    {
      title: 'DeFi Tools',
      path: '/shop/search/defi-tools'
    },
    {
      title: 'Analytics Tools',
      path: '/shop/search/analytics-tools'
    },
    {
      title: 'Utility Tools',
      path: '/shop/search/utility-tools'
    },
    {
      title: 'My Agent',
      path: '/shop/agent'
    },
    {
      title: 'Create Tool',
      path: '/shop/tool-builder'
    }
  ],
  'next-js-frontend-footer-menu': [
    {
      title: 'About Us',
      path: '/shop/about'
    },
    {
      title: 'Terms of Service',
      path: '/shop/terms'
    },
    {
      title: 'Privacy Policy',
      path: '/shop/privacy'
    }
  ]
};






export const pages = [
  {
    id: 'page-1',
    title: 'About Us',
    handle: 'about',
    body: '<h1>About Our NFT Marketplace</h1><p>We are dedicated to bringing you the best digital assets.</p>',
    bodySummary: 'We are dedicated to bringing you the best digital assets.',
    seo: {
      title: 'About Us',
      description: 'Learn more about our NFT marketplace'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'page-2',
    title: 'Terms of Service',
    handle: 'terms',
    body: '<h1>Terms of Service</h1><p>Please read our terms of service carefully.</p>',
    bodySummary: 'Please read our terms of service carefully.',
    seo: {
      title: 'Terms of Service',
      description: 'Terms of service for our NFT marketplace'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'page-3',
    title: 'Privacy Policy',
    handle: 'privacy',
    body: '<h1>Privacy Policy</h1><p>Your privacy is important to us.</p>',
    bodySummary: 'Your privacy is important to us.',
    seo: {
      title: 'Privacy Policy',
      description: 'Privacy policy for our NFT marketplace'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Initialize with an empty cart
let mockCart = {
  id: 'cart-1',
  checkoutUrl: '/checkout',
  totalQuantity: 0,
  lines: [],
  cost: {
    subtotalAmount: { amount: '0', currencyCode: 'SONIC' },
    totalAmount: { amount: '0', currencyCode: 'SONIC' },
    totalTaxAmount: { amount: '0', currencyCode: 'SONIC' }
  }
};

// Helper function to recalculate cart totals
export const recalculateCart = () => {
  let totalQuantity = 0;
  let subtotalAmount = 0;

  mockCart.lines.forEach(line => {
    totalQuantity += line.quantity;
    subtotalAmount += parseFloat(line.cost.totalAmount.amount);
  });

  mockCart.totalQuantity = totalQuantity;
  mockCart.cost.subtotalAmount.amount = subtotalAmount.toString();
  mockCart.cost.totalAmount.amount = subtotalAmount.toString();
  
  return {...mockCart};
};

export const getCart = () => {
  return Promise.resolve(mockCart);
};

export const createCart = () => {
  mockCart = {
    id: 'cart-' + Date.now(),
    checkoutUrl: '/checkout',
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: '0', currencyCode: 'SONIC' },
      totalAmount: { amount: '0', currencyCode: 'SONIC' },
      totalTaxAmount: { amount: '0', currencyCode: 'SONIC' }
    }
  };
  return Promise.resolve(mockCart);
};

export const addToCart = (lines) => {
  lines.forEach(line => {
    const { merchandiseId, quantity } = line;
    
    // Find the product variant
    let variant = null;
    let product = null;
    
    for (const p of products) {
      const v = p.variants.find(v => v.id === merchandiseId);
      if (v) {
        variant = v;
        product = p;
        break;
      }
    }
    
    if (!variant || !product) return;
    
    // Check if the item is already in the cart
    const existingLineIndex = mockCart.lines.findIndex(l => l.merchandise.id === merchandiseId);
    
    if (existingLineIndex !== -1) {
      // Update existing line
      mockCart.lines[existingLineIndex].quantity += quantity;
      mockCart.lines[existingLineIndex].cost.totalAmount.amount = 
        (parseFloat(variant.price.amount) * mockCart.lines[existingLineIndex].quantity).toString();
    } else {
      // Add new line
      mockCart.lines.push({
        id: `line-${Date.now()}`,
        quantity,
        cost: {
          totalAmount: {
            amount: (parseFloat(variant.price.amount) * quantity).toString(),
            currencyCode: variant.price.currencyCode
          }
        },
        merchandise: {
          id: merchandiseId,
          title: variant.title,
          selectedOptions: variant.selectedOptions,
          product: {
            id: product.id,
            handle: product.handle,
            title: product.title,
            featuredImage: product.featuredImage
          }
        }
      });
    }
  });
  
  return Promise.resolve(recalculateCart());
};

export const removeFromCart = (lineIds) => {
  mockCart.lines = mockCart.lines.filter(line => !lineIds.includes(line.id));
  return Promise.resolve(recalculateCart());
};

export const updateCart = (lines) => {
  lines.forEach(line => {
    const { id, quantity } = line;
    const lineIndex = mockCart.lines.findIndex(l => l.id === id);
    
    if (lineIndex !== -1) {
      const variant = mockCart.lines[lineIndex].merchandise;
      
      // Find the product variant price
      let variantPrice = 0;
      for (const p of products) {
        const v = p.variants.find(v => v.id === variant.id);
        if (v) {
          variantPrice = parseFloat(v.price.amount);
          break;
        }
      }
      
      mockCart.lines[lineIndex].quantity = quantity;
      mockCart.lines[lineIndex].cost.totalAmount.amount = (variantPrice * quantity).toString();
    }
  });
  
  return Promise.resolve(recalculateCart());
};