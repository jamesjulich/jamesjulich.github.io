---
title: "Getting My First CVE"
description: "How I discovered the vulnerability that lead to my first CVE"
pubDate: "Dec 31 2024"
---

On 12-30-24, Github issued [CVE-2024-56734](https://nvd.nist.gov/vuln/detail/CVE-2024-56734) for a security vulnerability I reported. This is the first time I've been through the vulnerability disclosure process, and I wanted to share how I ended up here.

I've been working on a new web app recently. It's built with NextJS and requires users to register/log in before using the app. Auth is famously hard to get right, and I didn't want to spend time building it myself. So, I decided to use a library.

## JavaScript Auth Libraries

Within the Javascript ecosystem, there are a few libraries that implement authentication. Auth.js (formerly NextAuth) is probably the most popular solution. It's undergoing some growing pains as it transitions from a NextJS library to a generic, framework-agnostic library. AdonisJS (the **wonderful** JavaScript equivalent of Laravel/Ruby on Rails) has a decent auth solution, but it's best-suited for use within an Adonis project. Finally, I found better-auth after browsing some Reddit posts.

better-auth is a relatively new authentication library. It's framework-agnostic and extremely modular. Of all the options I tested, this library was--by far--the easiest to wrap my head around. My project isn't handling any sensitive data or PII, so I decided that I was okay with the risk of using a new library.

## Callback URLs

I began using better-auth. While trying to implement email verification, I noticed an option to specify a callback URL. Callback URLs are frequently used in web applications to redirect users to another page after an action has been completed.

For instance, the URL below might redirect the user to /dashboard after they log in successfully.

```
https://example.com/login?callbackURL=%2Fdashboard
```

This is extremely useful, but it can be the source of a sneaky vulnerability: Open Redirection.

## Open Redirection

Open Redirection is a class of vulnerabilities. Broadly, it is when an attacker is able to trigger a redirect to an arbitrary URL. Unvalidated callback URLs are one of the most common ways open redirection attacks are introduced.

Consider the following URL:

```
https://example.com/login?callbackURL=https%3A%2F%2Fevil.com
```

If example.com were not validating the callback URL, this URL would cause an unsuspecting user to get redirected to https://evil.com after logging in.

Open redirection can also be used to achieve more damaging outcomes. Pages that modify application state are often a target for redirection attacks. Consider this example:

```
https://example.com/login?callbackURL=%2FtransferMoney%3Fto%3Dmallory%26amount%3D100
```

In this case, the callback URL (/transferMoney?to=mallory&amount=100) could cause a user to accidentally transfer money to the user 'mallory'. Not good!

## The Vulnerability

I noticed that at the /verify-email endpoint, I could specify a callback URL. Out of curiosity, I tried using google.com as a redirect target...and it worked!

Interestingly, better-auth has middleware applied to all auth routes that validates callback URLs. I realized that this middleware was only being triggered on POST routes, though. The email verification route was a GET route, so callback URLs were not being validated. After testing a few more values, I was ready to report the vulnerability.

## Disclosure

I was able to find a security email for better-auth, and I sent in a report. I also reached out to the lead maintainer over Discord to give them a heads-up to check the inbox. By the time I woke up the next morning, the vulnerability had been patched and a [Github security advisory](https://github.com/advisories/GHSA-8jhw-6pjj-8723) had been issued.

GitHub makes it very easy to request a CVE ID on an open-source project. When a security advisory is published through the "Security" tab of a repository, project maintainers can request a CVE ID. GitHub issued a CVE ID shortly after the advisory went public.

## Closing Thoughts

This experience taught me that you don't need to be a security expert to find and report vulnerabilities. If you've got basic knowledge of security practices, you can help out open source projects by reporting problems when you find them.

This was a new experience for me, and it couldn't have gone any smoother. It feels great to have contributed to an open-source project and earned a CVE in the process.

