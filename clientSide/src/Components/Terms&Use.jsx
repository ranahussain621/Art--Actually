import React, { useState } from 'react'
import blogbar from '../assets/images/blogbar.jpg'
import { Link } from 'react-router-dom';

const TersmsAndConditions = () => {

    const [showFullText, setShowFullText] = useState(false);

  const toggleFullText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <>
      <div style={{
  backgroundImage: `url(${blogbar})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '110px' 
}}>
 
</div>

<div className="container">
     <p className='' style={{textTransform:'uppercase',color:'#083A50',fontSize:'14px',}}> <u>Terms of use</u></p>
     <h2 className='' style={{textTransform:'uppercase',color:'#709AA4'}}>Introduction</h2>
     <p className="" style={{ color: '#083A50', fontSize: '16px' ,textAlign:'justify'}}>
i)  Please read these terms of use (“Terms”) carefully before accessing and/or using the
Platform. These Terms govern your rights and obligations (whether as a guest user or
a registered member) regarding the access and/or use of Art Actually Inc. website
<Link href="http://www.artactually.net" about='_blank'>(http://www.artactually.net)</Link>, mobile application or any Internet service (including
any associated software supplied by Art Actually Inc.) (collectively referred to as
“Platform”) under Art Actually Inc.’s control or ownership.<br/><br/> These Terms constitute a
legally binding agreement between Art Actually Inc. (including all its subsidiaries,
related and/or associated companies) (these entities are collectively referred to as
“Art Actually Inc.”, “we”, “us” or “our”), the proprietor of all rights in and to the
Platform, and you, the user and/or registered member of the Platform. The Platform
shall only be available to registered members, uploading, posting, viewing,
forwarding and/or otherwise using the advertisements, promotional materials,
views, comments and/or other information on the Platform (collectively referred to
as the “Member” or “Members”).<br /> <br /> Members refer to all individuals and/or entities
accessing and/or using the Platform anytime and anywhere for any reason or
purpose. The Company grants the member a limited, restricted, personal,
non-transferable, non-sublicensable, revocable license to access the Application only
as expressly permitted in these Terms and Conditions. The use of the Platform and
the access to and use of the information provided in the Platform by the user and/or
member is subject to their agreement to the Privacy Policy and terms and conditions
set forth herein (the “Terms and Conditions'') and the completion of any applicable
registration requirements.<br /> <br /> By accessing or registering to access any portion of the
Platform or by using any portion of the Platform, the user and/or member agrees to
be bound by the Privacy Policy and Terms and Conditions. If the user and/or member
do not agree to be bound by both the Privacy Policy and the Terms and Conditions,
the user and/or member should not proceed any further and should not access or
use the Application or any of the Services made available therein.   <br /> <br />

ii) Art Actually Inc. is an online platform that provides access to search and identify,
plan and schedule for virtual exhibitions, virtual concerts. Let the audience enjoy art
pieces or music online. Users can upload art pieces to their pages.

<br /> <br />       {showFullText ? (
            <>

iii)  Art Actually Inc. is a company that provides the Platform but not art pieces. The
platform enables Art Actually Inc. members to upload and enjoy art pieces or virtual
exhibitions or events offered by users. It is up to users to offer events to Art Actually
members and it is up to Art Actually members to accept and register for such events.
The Platform provided by Art Actually Inc. is to connect users but it does not nor is it
intended to provide any art or any act that can be construed in any way as an act of
providing art pieces or delivery services. The information which Art Actually Inc.
discloses in the Platform is based on information provided by the user (including but
not limited to suppliers, distributors, their representatives, distributors, user, etc.).
Changes in market conditions or circumstances may occur on short notice which may
make information displayed in the Platform inaccurate or outdated. As such, Art
Actually Inc. cannot guarantee all information provided by the user in the Platform is
accurate, complete, correct or up to date, nor will Art Actually Inc. be held
responsible for any errors (including manifest and typographical errors) regarding the
information of the events or delivery. <br /><br />
iv)  By accessing, browsing, downloading and/or using the Platform, you acknowledge
that you agree to comply with and be bound by these Terms, as amended from time
to time by Art Actually Inc.. If you disagree with any part of these Terms, you must
immediately discontinue your access and/or use of the Platform. <br /><br />
v)  We may revise or update these Terms at any time by posting a revised/an updated
version on the Platform without any notice. Unless stated otherwise, any revision or
update takes effect immediately. Your continued access and/or use of the Platform
after a revision or update to these Terms constitute your binding acceptance of the
revised or updated Terms. <br /><br />
vi)  We may change or update the Platform and any information on the Platform at any
time without notice to you or liability to us. We may also suspend, discontinue, or
restrict access to, the Platform temporarily or permanently at any time without
notice to you or liability to us. <br /><br />
vii)  Headings are inserted for convenience and shall not affect the interpretation of these
Terms. <br /> <br />
2.   <u>MEMBER REGISTRATION </u> <br /><br />
i) 
User registration: You can register ONE account with an email address. <br /><br />
ii)  
Art Actually Token is available per the price plan described on the website for
registered members. <br /><br />
iii) 
You may pay Art Actually members including artists to show a token of support. We
reserve the right to amend the price and the expiration date of the membership. <br /> <br />
iv)  <u>Membership sign-up</u>: <br /><br /> To become a Art Actually member, you must sign up for an
account (“Account”) on the Platform or through your Google credentials.By signing
up for an Account with us or using the Platform, you permit us to collect, store,
retain and use any and all personal data about you in accordance with our Privacy
Policy and any information that you permitted Facebook to provide to us. The Privacy
Policy is incorporated as part of these Terms by reference. Please read the Privacy
Policy carefully for information relating to Art Actually Inc.’s practices regarding the
collection, use, disclosure and transfer of your personal data. You agree to maintain
accurate, complete and up-to-date personal data in your Account. Your failure to
maintain accurate, complete and up-to-date personal data (including having an
invalid or expired Payment Method) may result in your inability to access and use the
Platform or Art Actually Inc.’s termination of your membership. In certain instances
you may be asked to provide proof of identity by us and/or our user to access or use
the Platform/event and you agree that you may be denied access to or use of the
Platform/event if you refuse or fail to provide proof of identity. If you sign up for an
Account through your Facebook credentials, you permit us to access certain
information from your Facebook’s profile for use by the Platform. You may be able to
control the amount of information that is accessible to us by adjusting your account
privacy settings on Facebook. You are solely responsible for maintaining the
confidentiality of your username and/or login password and for restricting access to
your Account and you agree to accept responsibility for all activities that occur under
your Account.If you are using or opening an Account on behalf of a company, an
entity, or an organization (“Organization”), then you represent and warrant that you
are an authorized representative of that Organization with the authority to bind such
Organization to these Terms; and agree to be bound by these Terms on behalf of
such Organization. <br /><br />
v)  Membership start date: Your membership starts on the date on which you sign up for
an Account with us. Each regular membership does not have an expiration date,
while VIP membership’s expiration date varies according to the details listed on the
website. VIP membership will automatically renew when expired without prior notice
to you. For example, if your subscription plan starts on Nov 11 2023, your
membership will automatically renew on Nov 11 2024. <br /><br />
vi)  Membership fee: There is no membership fee incurred for Regular registered
members, while membership fee incurred for VIP members varies according to the
details listed on the website. We reserve the right to adjust the membership fee for
the Service or any components thereof provided by the user in any manner and at
any time as we may determine in our sole and absolute discretion. Except as
otherwise expressly provided for in these Terms, any changes to the membership fee,
or Token will take effect following the notice sent to you. <br /><br />
vii)  user’s charges: Your membership only covers your access to the Events listed as “free
events” on the Platform. Some of the Event Providers may also charge other fees that
are not included in their regular event fees or offer other promotions or add-ons and
you are responsible for such charges. Please read the description of each event <br /><br />
carefully or make enquiry to the user directly before registering your event.
viii)  Promotional offers or discounts: We may make promotional offers or discounts with
different features and different rates to our Art Actually Inc. members from time to
time in our sole and absolute discretion and you agree that such promotional offers
or discounts, unless also made available to you, shall have no bearing on your use of
the Service provided by the user or the membership fee applied to you. <br /><br />
ix)  Membership cycle: The membership is automatically renewed at the end of the
membership cycle unless the member request for membership cancellation is
received by us. We reserve the right to change the timing of our membership cycle
without any further notice to you. <br /> <br />
x)  The payment amount required for Event registration and “support” varies per Artists
and Users. <br /><br />
3.  <u>PURCHASING AND PAYMENTS</u> <br /> <br />

i)  If you do not have membership, you are only able to access our platform via a limited
function. <br /><br />
ii)
Regular and VIP members are able to access all the functions in our platform as
stated in the membership details in the website.. <br /><br />
iii)  Payment Method: Payment is settled by Stripe <br /><br />
a.
Stripe via electronic means
We use third party payment users to facilitate your Payment Method. The terms of
your payment will be based on your Payment Method and may be determined by
agreement between you and your financial institution, credit/debit card issuer or
other provider of your selected Payment Method. We disclaim all liabilities
associated with the security of the Payment Method. You shall be responsible to
resolve any disputes with your financial institution, credit/debit card issuer or other
provider of your selected Payment Method. <br /><br />
b.
Bank cash transfer
Upon successful cash transfer via ATM to our designated bank account and
confirmation via transaction record and/or payslip reference. <br /><br />
iv)  Taxes:
Your purchase is exclusive of applicable taxes where required by law. You agree
that your purchase shall be subject to all prevailing statutory taxes, duties, fees,
charges and/or costs, however denominated, as may be in force and in connection
with any future taxes that may be introduced at any point of time. You further agree
to use your best efforts to do everything necessary and required by the relevant laws
to enable, assist and/or defend us to claim or verify any input tax credit, set off,
rebate or refund in respect of any taxes paid or payable in connection with the
Service. <br /><br />
v)  No refund: We will not refund or credit for any Membership fee after registration,
unless you provide credible evidence to prove that you have been wrongly billed or
such other circumstances on a “case to case” basis as we may decide in our sole and
absolute discretion. <br /><br />
4. <u>ARTIST, ARTWORK, EVENT, AND VIRTUAL EXHIBITION</u> <br /><br />
i)  Artist / Artwork / Event / Virtual Exhibition search: You may search for Artists or
Artwork or Event or Virtual Exhibition and view related information. We may also
feature an Artist or Event or Virtual Exhibition as an advertisement on the Platform
or on any other social media sites, but this is not a recommendation or endorsement
of such Artist or Event or Virtual Exhibition. i.We make no guarantees,
representations and/or warranty on the quality or nature of the user or Events
provided by the user. <br /><br />
ii)  Support: You may support an artist ,an artwork, or join events by Stripe, a 15 cents
admin fee will be deducted before going to the artist.
iii) Review an event : <br /><br />
You may review your experience in an event or virtual exhibition.
By posting your review on the Platform, you grant us an irrevocable, worldwide,
non-exclusive, perpetual, royalty-free, sub-licensable and transferable license to use,
reproduce, publish, list information regarding, remove, translate, distribute, publicly
perform or display, and make derivative works of your review in whole or in part, in
any form, media or technology, whether now known or hereinafter developed for
any purposes, including for the purpose of marketing and promoting Art Actually Inc.
and the Platform in any media formats and through any media channels, without
further notice to or consent from you, and without the requirement of payment to
you or any other person or entity. We may, in our sole and absolute discretion,
choose to monitor, review or remove your rating and/or review without any notice if
we think your rating and/or review has violated these Terms.
iv)  Feedback: <br /><br />
 If you provide us with any comments, bug reports, feedback, or
modifications proposed or suggested by you to the Platform provided by the user
(“Feedback”), we have the right to use such Feedback in our sole and absolute
discretion. You grant us an irrevocable, worldwide, non-exclusive, perpetual,
royalty-free, sub-licensable and transferable license to incorporate and use your
Feedback for any purposes. <br /><br />
v) User Content: If you upload an art piece or any forms of user content, whether in
textual, audio and/or visual form, including submission of entries for competitions
and promotions, such user content remains your property. However, by providing
user content to us, you grant us an irrevocable, worldwide, non-exclusive, perpetual,
royalty-free, sub-licensable and transferable license to use, reproduce, modify,
publish, list information regarding, edit, remove, translate, distribute, publicly
perform or display, and make derivative works of your user content in whole or in
part, in any form, media or technology, whether now known or hereinafter
developed for any purposes, including for the purpose of marketing and promoting
Art Actually Inc. and the Platform in any media formats and through any media
channels, without further notice to or consent from you, and without the
requirement of payment to you or any other person or entity.
You represent and warrant that: <br /><br /> (i) you either are the sole and exclusive owner of all
user contents or you have all rights, licenses, consents and releases necessary to
grant us the license to the user content as set forth above; and <br /><br />(ii) neither the user
content nor your submission, uploading, publishing or otherwise making available of
such user content nor our use of the user content as permitted herein will infringe,
misappropriate or violate a third party's intellectual property or proprietary rights, or
rights of publicity or privacy, or result in the violation of any applicable law or
regulation and shall fully indemnify us for any breach of this clause.
You agree to not provide user content that is defamatory, libelous, hateful, violent,
obscene, pornographic, unlawful, or otherwise offensive, as determined by us in our
sole and absolute discretion, whether or not such material may be protected by law.
We may, but shall not be obligated to, review, monitor, or remove user content, in
our sole and absolute discretion and at any time and for any reason, without notice
to you or liability to us. <br /><br />
vi)  Late-cancellation and no-show policy: Art Actually Inc. maintains a free cancellation
policy before the stipulated cancellation deadline. If you wish to cancel your event or
virtual exhibition registration, you must do so in accordance with the cancellation
cut-off time specified by our platform. If you cancel your registration of an event
after the cancellation cut-off time, this will be considered as a late cancellation
where administration fees will be charged on you. If you do not show up at your
registered event, this will be considered as a no-show. You will be liable for a
Payment or Token required for the registered event in such situation.
Event cancelled late or no-show is subjected to the following fees:
- Cancellation request 24 hours prior to the start time of the registered event: Full
amount of payment refunded and would be credited to member’s account.
- Cancellation request less than 24 hours prior to the start time of the registered
event: No refund is granted and the full payment for the registered event would be
debited to the member’s account.
There will be no refunds (either in the form of money or credit) for registered events
that are not cancelled before the stipulated deadline or that you did not attend
(no-show). There will also be no refunds for unused event tickets or virtual
exhibitions registered unless you provide credible evidence to us to prove that you
have been wrongly billed.
We reserve the right to suspend or terminate your Account without compensation to
you and/or prevent your access to the Platform if you are found to have repeatedly
violated this policy. We reserve the right in our sole and absolute discretion to
remove certain Events from the Platform. We shall not be liable for the Events
cancellation or no-show by our user.
Communications from Art Actually Inc.: By signing up with Art Actually Inc., you
agree to receive certain email and other communications in connection with the
Platform. For example, you might receive review requests, Events registration and
cancellation confirmations. Communications relating to your Account will only be
sent for important purposes, such as password recovery. You will also receive our
e-mail newsletter from time to time. You can opt-out from receiving our e-mail
newsletter by clicking the “Unsubscribe” link at the bottom of the e-mail. <br /><br />
vii)  Children: The membership is only open to those who have attained the age of 15 or
above, or the age of majority in your country. By signing up with Art Actually Inc., you
represent and warrant that you are at least 15 years of age. If you are under the age
of 15 or the age of majority in your country, you are not allowed to sign up for a
membership and may only use the platform under the company or supervision of a
parent or legal guardian, under such person’s Account and otherwise subject to
these Terms. <br /><br />
viii)  Multiple accounts: Every member is only entitled to create one account per email.
Any member violates these Terms and shall have his Account suspended and/or
terminated and shall not be allowed to have access to the Platform upon suspension
and/or termination. We reserve the right to review and investigate all allegations of
fraudulent activities and to take any and all measures we and/or our user deem
necessary to ensure a fair sign up scheme is implemented accordingly. <br /><br />
ix)  Additional terms: When using the Platform, you will be subject to any additional
guidelines or rules applicable to specific products, services or features which may be
posted from time to time <b>(“FAQs”)</b> . All such FAQs are hereby incorporated by
reference into these Terms. In the event of any inconsistencies or discrepancies
between these Terms and the FAQs, these Terms shall prevail.Should you have any
questions, please send us an email to info@artactually.net
5.  <u>YOUR OBLIGATIONS</u> <br /><br />
i)  You are solely responsible for your own internet connection/telecommunication
charges incurred for accessing and connecting to the Platform. <br /><br />
ii)  You may access and view the Platform and may save an electronic copy or print out a
copy of the materials from the Platform, solely for your own personal and
non-commercial use. All copies that you make must be in the form as presented on
the Platform and must include all applicable copyright and other notices on the
Platform. You must not modify the paper or digital copies of any materials you have
printed off or downloaded in any way, and you must not use any illustrations,
photographs, video or audio sequences or any graphics separately from any
accompanying text or for any commercial use. <br /><br />
iii)  You must comply at all times with any instructions for use of the Platform which we
make from time to time. <br /><br />
iv)  You must keep your username and/or login password secure and: <br /><br />
a. Not permit any other person to use your username and/or login password,
including not disclosing or providing it to any other person and
 <br /><br />b. immediately notify us if you become aware of any unauthorized use or disclosure
of your username and/or login password, by sending an email to
 <b> info@artactually.net</b> <br /><br />
v)  You should be aware that there are inherent physical and mental health risks to
participation in registered events, including risk of injury or illness.v.Prior to
participating in any of the events, you should seek the advice of your doctor or other
qualified healthcare professional if you have any concerns or questions about your
health. By joining the events provided by the user, you acknowledge and agree that
your participation in any of the Events offered by our user is entirely at your own risk
and you shall have no recourse whatsoever against us. <br /><br />
vi) You must not: <br /><br />
a. act in a way, or use or introduce anything (including any virus, worm, Trojan horse,
time bomb, keystroke logger, spyware or other similar feature) that may
compromise, damage, detrimentally interfere with, surreptitiously intercept or
expropriate any system, network, data or personal data stored on the Platform
 <br /><br />b. use the Platform in any manner that could damage, disable, overburden or impair
any of our server, or the networks connected to our server, or interfere with any
other party’s access and use of the Platform;
 <br /><br />c. attempt to gain unauthorized access to the Platform, other Art Actually Inc.
members’ Accounts, computer systems or networks connected to our server, through
hacking, password mining or any other means or interfere or attempt to interfere
with the proper working of the Platform or any activities conducted on the Platform;
 <b><br /></b>d. obtain, or attempt to obtain, any information through any means not intentionally
made available on or through the Platform;
 <br /><br />e. remove, circumvent, disable, damage or otherwise interfere with security-related
features of the Platform;
 <br /><br />f. license, sub-license, sell, re-sell, transfer, assign, distribute or otherwise
commercially exploit or make available to any third party the Platform in any way;
 <br /><br />g. modify or create a derivative work based on the materials on the Platform, nor
decompile, decipher, reverse-engineer or disassemble or otherwise attempt to derive
any source code or underlying ideas or algorithms of any part of the Platform in
order to build a competitive product or service; build a product using similar ideas,
features, functions or graphics of the Platform; or copy any ideas, features, functions
or graphics of the Platform;
 <br /><br />h. link to, mirror or frame any portion of the Platform;
 <br /><br />i. cause or launch any programs or scripts for the purpose of scraping, indexing,
surveying, or otherwise data mining any portion of the Platform;
 <br /><br />j. intentionally or unintentionally cause or attempt to cause physical or property
damage or harm to any Art Actually Inc. members or user; and/or
 <br /><br />k. permit third parties (including other Art Actually Inc. members) to use any Events
reserved under your own membership, unless such Events are reserved for a child’s
use, in which case, the child must be accompanied or supervised by you when
he/she uses the Events. <br /><br />
vii)  You hereby agree to fully indemnify and hold us, our affiliates, and each of our and
their respective directors, shareholders, employees, users, partners, agents,
contractors, directors, suppliers, vendors and representatives harmless against all
losses, damages, claims, liabilities, expenses or costs that arise from or in connection
with: <br /><br />
a. your access and/or use of the Platform;<br /><br />
b. your breach of any of these Terms or any applicable law or regulation;<br /><br />
c. your dealing with the user, including your breach of any terms set by the user or 
the rights of any third party;<br /><br />
d. 
any other party's access and/or use of the Platform e using your username and/or
login password; and/or <br /><br />
e. Any other party's breach of any of these Terms where such party was able to
access and/or use the Platform using your username and/or login password.
f. Any rights relating to the use of the Platform not expressly granted herein are
reserved and no license or right is granted to you by implication, estoppel or
<br /><br />
6. <u>INTELLECTUAL PROPERTY</u> <br /><br />

i)  We are the owner (or the licensee, where applicable) of all proprietary and
intellectual property rights on the Platform (including all information, data, texts,
graphics, visual interfaces, artworks, photographs, logos, icons, sound recordings,
videos, look and feel, software programmes, computer code, downloadable files,
software applications, interactive features, tools, services) or other information or
content made available on or through the Platform. <br /><br />
ii)  We grant you, subject to these Terms, a non-exclusive, non-transferable,
non-assignable, personal, limited license to access and use the Platform for your own
personal use. This license is revocable at any time without notice to you or liability to
us. All rights not expressly granted to you are hereby expressly reserved by us. <br /><br />
iii)  The word “Art Actually Inc.”, and our logo are our trademarks, trade names and
service marks. Without our prior written permission, and except as solely enabled by
any link as provided by us, you agree not to display or use in any manner the marks
“Art Actually Inc.”. <br /><br />
iv)  All other trademarks, trade names, service marks, product names and logos
contained herein that are not owned by, licensed to or controlled by us are used in
an editorial fashion only, and to the benefit of respective owners, with no intention
of trademark infringement. <br /><br />
7. <u>DISCLAIMERS</u> <br /><br />

i)  While we endeavor to ensure that the information and materials on the Platform are
correct, no representation, warranty or guarantee, express or implied, is given that
they are complete, accurate, up-to-date, fit for a particular purpose and, to the
extent permitted by law, we do not accept any liability for any errors or omissions.
The information and materials on the Platform and/or the quality of the art piece
provided by the user are provided to you for information purposes only and on an
“as is” and “as available” basis without representations, warranties or guarantees of
any kind either express or implied. <br /><br />
ii.
Whilst we endeavor to make the Platform available 24 hours a day, we shall not be
liable if for any reason the Platform is unavailable for any time or for any period. We
make no representation, warranty or guarantee that your access to the Platform will
be uninterrupted, timely or error-free. In addition, we may occasionally need to carry
out repairs, maintenance or introduce new facilities and functions.
To the extent permitted by law, we and our licensors hereby disclaim all warranties,
express or implied, statutory or otherwise, in respect of the Platform and we and our
licensors have no liability or responsibility to you or any other person (even if we
have been advised as to the possibility) for any direct, indirect, economic, exemplary,
incidental or consequential loss (including loss of profit and loss of data), damage,
claim, liability, expense or cost, whether in contract, tort (including negligence),
equity, breach of statutory duty or otherwise, arising out of or in connection with: <br /><br />
a. the Platform being unavailable (in whole or in part), interrupted or performing
slowly;<br />
b. any error in, or omission from, any information made available through the
Platform;<br />
c. any other party's access and/or use of the Platform using your username and/or
login password;<br />
d. any exposure to malicious software including but not limited to, viruses,
computer worms, Trojan horses, spyware or other harmful forms of interference
which may damage your computer system, mobile device, software, data or other
property or expose you to fraud when you access or use the Platform. To avoid
doubt, you are responsible for ensuring the process by which you access and use the
Platform protects you from this; and/orbr <br />
e. any link on the Platform to other sites does not imply any endorsement, approval
or recommendation of, or responsibility for, those sites or their contents, operations,
products or operators. <br /><br />
iii.
We make no representation, warranty or guarantee: <br />
a. that the Platform is appropriate or available for use in all countries or that the
content satisfies the laws of all countries. You are responsible for ensuring that your
access to and use of the Platform is not illegal or prohibited, and for your own
compliance with applicable local laws; <br />
b. that the Platform will be compatible with all hardware, software and operating
system which you may use; <br />
c. about the accuracy, reliability, suitability, completeness or timeliness of the
Platform or of any information from the user, such as event times, locations and
descriptions; and/or <br />
d. about the quality, suitability, safety or ability of the user’ services. <br />
iv.
We are not responsible nor liable for any direct, indirect, economic, exemplary,
incidental or consequential loss (including loss of profit and loss of data), damage,
cost or expense, whether in contract, tort (including negligence, injuries or other
health or medical problems), that you may suffer or incur as a result of or in
connection with the acts, omissions and/or negligence of any users.
v.
We are not a party to any agreement, dealing or transaction entered into between
you and the user, whether as a result, directly or indirectly, from using the Service
and we disclaim any and all responsibilities and/or liabilities arising from such
agreement between you and the user. <br /> <br />
8. <u>EXCLUSION OF LIABILITY</u> <br /><br />

i)  To the maximum extent permitted by law: <br /><br />
a. your access and use of the Platform and/or Service is entirely at your own risk
and <br /><br />
b. we, our respective directors, shareholders, employees, users, partners, agents,
contractors, directors, suppliers, vendors and representatives are not liable or
responsible to you or any other person for any direct, indirect or consequential loss
(including loss of profit and loss of data), damage, claim, liability, expense or cost,
whether in contract, tort (including negligence), equity, breach of statutory duty or
otherwise, arising out of or in connection with these Terms, the Platform and/or
Service, or your access and use of (or inability to access or use) the Platform and/or
Service. <br /><br />
ii)  To the extent our liability cannot be excluded but can be limited, our liability shall not
exceed Canadian Dollars $20.
iii)  To the maximum extent permitted by law and only to the extent clauses 7 of these
Terms do not apply, our total liability to you under or in connection with these Terms,
or in connection with the Platform, or your access and use of (or inability to access or
use) the Platform, shall not exceed Canadian Dollars $20.. <br /><br />
9. <u>SUSPENSION AND TERMINATION</u> <br /><br />

i)  We reserve the right, in our absolute discretion, to monitor any and all access and
use of the Platform. <br /><br />
ii)  Without prejudice to any other right or remedy available to us, if we consider that
you have breached any of these Terms or we otherwise consider it appropriate, we
may immediately, and without notice to you or liability to us, suspend or terminate
your Account and access to the Platform without compensation to you and we may
block access from a particular Internet protocol address to the Platform (or any part
of it) in the event of any breach of these Terms. In addition, we reserve the right to
seek all remedies available under these Terms, at law and in equity for breach of
these Terms. <br /><br />
iii)  On suspension or termination of your Account, you must immediately cease using
the Platform and/or Service and must not attempt to gain further access. <br /><br />
10  <u>LINKS TO OTHER WEBSITES</u> <br /><br />
i)  Any links provided on the Platform are provided for your convenience only. Should
you leave the Platform via such a link, the content that you view in such linked web
page or website owned or operated by third parties is not provided or controlled by
us. We shall not be responsible for any consequences of your accessing the linked
web page or website, and/or the content at those web pages or websites. We make
no guarantee, representation or warranty as to, and have no liability for, any content
at those websites, including, but not limited to, guarantees, representations and
warranties regarding truth, adequacy, originality, accuracy, timeliness, completeness,
reasonableness, non-infringement, suitability, satisfactory quality, merchantability or
fitness for any particular purpose or any representations, warranties or guarantees
arising from usage, custom or trade or by operation of law. <br /><br />
ii)  Any such link to other linked web pages or websites on the Platform does not
constitute an endorsement, authorization, verification or representation that we are
affiliated with the operators or owners of those linked websites, or the contents. <br /><br />
iii)  You agree that your access to and/or use of such linked web pages or websites is
entirely at your own risk and subject to the terms and conditions of access and/or
use contained therein. <br /><br />
11. <u>THIRD PARTY ADVERTISING</u> <br /><br />

We may allow third party advertisers to place advertisements on the Platform or any
part thereof. Such advertisements will be clearly identified as originating from third
parties. By using the Platform, you agree to receive such advertising and marketing
materials. If you do not want to receive such advertising and marketing materials you
should notify us in writing. We do not endorse, and will not be responsible for, the
contents of such advertisements or for your access, use, reliance, sale, purchase, or
other action on your part with respect to the contents or subject matter of such
advertisements. <br /><br />
12. <u>GENERAL</u> <br /><br />

i)  If we need to contact you, we may do so by email or by posting a notice on the
Platform. Notice will be deemed given 24 hours after email is sent or notice is posted
on the Platform. You agree that this satisfies all legal requirements in relation to
written communications. <br /> <br />
ii)  These Terms, and any dispute relating to these Terms or the Platform, shall be
governed by and construed in accordance with the laws of Canada without regard to
the choice or conflicts of law principles of any jurisdiction. Each party submits to the
exclusive jurisdiction of the Canada Court in relation to any disputes or claims arising
out of or in connection with these Terms or the Platform. <br /><br />
iii) We may revise and/or update this Term of Use at any time by posting a revised/an
updated version on the Platform. Unless stated otherwise, any revision or update
takes effect immediately. Your continued access and/or use of our Platform or
dealing with us after a revision or update to this Term of Use constitute your binding
and acceptance of the revised or updated Term of Use. <br /><br />
iv)  Clauses which, by their nature, are intended to survive termination of these Terms,
including clauses 5, 6, 7 and 11, continue in force. <br /><br />
v)  If any part or provision of these Terms is or becomes illegal, unenforceable, or invalid
under any enactment or rule of law or by any court in any jurisdiction, that part or
provision is deemed to be modified to the extent required to remedy the illegality,
unenforceability or invalidity. If a modification is not possible, the part or provision
must be treated for all purposes as severed from these Terms. The remainder of
these Terms will remain in full force and effect and continue to be binding and
enforceable on you. <br /><br />
vi)  These Terms set out everything agreed by the parties relating to your use of the
Platform and/or Service and supersede and cancel anything discussed, exchanged or
agreed prior to you agreeing to these Terms. The parties have not relied on any
representation, warranty, guarantee or agreement relating to the Platform and/or
Service that is not expressly set out in these Terms, and no such representation,
warranty, guarantee or agreement has any effect from the date you agreed to these
Terms. <br /><br />
vii)  You may not assign these Terms without our prior written approval. We may assign
these Terms without your consent to: <br /> <br />(a) our subsidiary or related/affiliated company; <br />
(b) an acquirer of our equity, business or assets; or <br /> (c) a successor by merger. <br /><br /> No
joint venture, partnership, employment, or agency relationship exists between you,
Art Actually Inc. or any Partner as a result of these Terms or use of the Platform
and/or Service. <br /><br />
viii)  Any person or entity who is not a party to this Agreement shall have no rights under
the Contracts (Rights of Third Parties) Ordinance <br /><br />
13. <u>ENGLISH VERSION TO PREVAIL</u> <br /><br />

In the event of any inconsistencies or discrepancies between the English version and
other translated versions of these Terms or the information on the Platform, the
English version shall prevail. <br /><br />
              <span style={{ color: 'blue', fontWeight: 'bold' }}> <a href="#ReadMore" onClick={toggleFullText}>Read More</a></span>
            </>
          ) :  
          <span style={{ color: 'blue', fontWeight: 'bold' }}> <a href="#ReadMore" onClick={toggleFullText}>Read More</a></span>
        }
        </p>

   </div>
    </>
  )
}

export default TersmsAndConditions