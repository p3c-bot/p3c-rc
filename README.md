# p3c-bot.github.io
P3C Interface. Make sure you have Saturn Wallet installed. This can be run locally if necessary.

1. ```npm install -g live-server```
2. Run ```live-server``` from directory.
3. Navigate to `/interact.html`.

# Want to create a fork with a permanent Masternode?
1. Go to `/lib/masternode.js`
2. Replace null in `var permanentMasternode = null` with your masternode.
3. Replace the logo and title in `interact.html`.
4. Replace the emerald color scheme in `main.css`.

# Development tips
- I use http://remix.ethereum.org/ to deploy smart contracts
- ETC only uses 0.4.21 or below compilers.
- For a dapp fork, Copy and paste source code into Remix and then deploy.

For frontend:
- Use [farmer.html](p3c.io/farmer.html) as a template with jquery, very simple but works.
- Use [Farm](https://github.com/p3c-bot/p3c-bot.github.io/blob/master/lib/farmer.js) to understand how to connect web3 with javascript
