import React from "react";


export default function Footer() {
return (
<footer className="app-footer">
<div className="container footer-inner">
<p>© {new Date().getFullYear()} HabbitTracker. All rights reserved.</p>
<p className="small">Built with ❤️ — Track small wins</p>
</div>
</footer>
);
}