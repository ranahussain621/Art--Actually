import React, { useState } from 'react'
import blogbar from '../assets/images/blogbar.jpg'

const PrivacyPolicy = () => {

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
     <p className='' style={{textTransform:'uppercase',color:'#083A50',fontSize:'14px'}}> <u>Privacy Policy</u></p>
     <h2 className='' style={{textTransform:'uppercase',color:'#709AA4'}}>Introduction</h2>
     <p className="" style={{ color: '#083A50', fontSize: '16px' ,textAlign:'justify'}}>
i. This is the privacy policy (“Privacy Policy”) of Art Actually Inc. (including all its
subsidiaries, related and/or associated companies) (these entities are collectively
referred to as “Art Actually”, “we”, “us” or “our”). Art Actually is committed to
respecting and protecting your privacy online. This Privacy Policy explains our
practices regarding the collection, use, disclosure and transfer of your personal data. <br /><br />
ii.
This Privacy Policy is incorporated as part of the Art Actually’s Terms of Use. Your use
of the Platform is subject to the Terms of Use and this Privacy Policy. Unless
specifically defined in this Privacy Policy, the defined terms shall have the same
meaning as defined in the Terms of Use. <br /><br />
iii.
To process, administer and/or manage your relationship with us, we will necessarily
need to collect, use, disclose and/or transfer your personal data. This Privacy Policy
applies to personal data about you (Art Actually members, Art Actually Service
Providers, business/marketing partners, agents, vendors, distributors, suppliers,
contractors, service providers, etc.) and/or individuals provided by you, possessed by
us or that we obtain about you, whether now or in the future. We will only process
your personal data in accordance with the prevailing personal data protection and
privacy laws of the countries we operate in and this Privacy Policy. <br /><br />
iv.
If you are a company, an entity or an organization, references to the term “you” and
“your” shall also include your employees, representatives and agents. <br /><br />

v.
By accessing, browsing, downloading and/or using our Platform or by dealing with
us, you acknowledge that you have read and understood this Privacy Policy and
agree to us processing your personal data in accordance with the manner as set out
in this Privacy Policy, as amended from time to time. <br /><br />
vi.
We may revise and/or update this Privacy Policy at any time by posting a revised/an
updated version on the Platform. Unless stated otherwise, any revision or update
takes effect immediately. Your continued access and/or use of our Platform or
dealing with us after a revision or update to this Privacy Policy constitute your
binding and acceptance of the revised or updated Privacy Policy.


<br /> <br />       {showFullText ? (
            <>
       vii.
It is necessary for us to collect and process your personal data. If you do not provide
us with your personal data, or do not consent to this Privacy Policy or any
amendments to this Privacy Policy, we may not be able to render all services to you
and/or you may be required to terminate your relevant agreement with us and/or
stop accessing or using the Platform.

<br /><br />

2.
COLLECTION OF PERSONAL DATA <br /><br />
i.
The term “personal data” means any information in our possession or control that
relates directly or indirectly to an individual to the extent that the individual can be
identified or is identifiable from that information such as name, address, telephone
number, passport/identification card number, date of birth, email address, gender,
race, bank details, credit/debit card details, etc. The types of personal data collected
depend on the purpose(s) of collection. We may “process” your personal data by way
of collecting, recording, holding, storing, using, disclosing and/or deleting it.<br /><br />
ii. 
Your personal data may be collected from you during your course of dealings with us
in any way or manner including pursuant to any transactions and/or communications
made from/with us. We may also collect your personal data from a variety of
sources, including without limitation, at any meetings, events, activities, contests,
customer satisfaction surveys organized and/or sponsored by us, as well as from
publicly available sources such as directories and Art Actually’s social media pages, if
you follow, like or are a fan of such pages. Further information may also be collected
when we exchange communications with you, for example, if you submit a request,
file a complaint or contact our support team. <br /><br />
iii.
In addition, we may also receive, store and process your personal data which are
provided or made available by any third parties whom you have authorized, credit
reference/reporting bodies, regulatory and law enforcement authorities, for reasons
including delivery of the class provide by the Service Provider, performance of
conditions of agreements and/or to comply with our legal and regulatory obligations. <br /><br />
3.
PURPOSE OF ACQUIRING AND PROCESSING YOUR PERSONAL DATA <br /><br />
The personal data as provided/furnished by you to us or collected by us from you or
through such other sources as may be necessary for the fulfillment of the purposes
at the time it was sought or collected, may be processed for the following purposes
(collectively referred to as the “Purposes”): <br /><br />
i.
Where you are a Art Actually member: <br /><br />
a. To register for a user Account with us;<br /><br />
b. To process, manage or verify your identity; <br /><br />
c. To provide, maintain and improve the Platform; <br /><br />
d. To fulfill and validate your registration/donation/purchase; <br /><br />
e. To allow our authorized Service Providers providing direct update and 
communications to you; <br /><br />
f. To process payment from/To you, including authorizing and processing online
banking, credit/debit card transactions and sending receipts To you; <br /><br />
g. To communicate with you and To maintain and improve cusTomer relationship;
h. To personalize and improve your user experience with the Platform;  <br /><br />
i. To provide you with support and handle requests and complaints; <br /><br />
j. To facilitate your participation in, and our administration of, any of our activities
including contests, promotions, campaigns, polls or surveys; <br /><br />
k. To conduct market research or surveys, internal marketing analysis, cusTomer
profiling activities, analysis of cusTomer patterns and choices, usage and activity
trends analysis in relation To the Platform and our users’ demographics (on an
anonymized basis); <br /><br />
l. To protect and/or enforce our legal rights and interests, including defending any
claim; <br /><br />
m. To comply with, our legal and regulatory obligations under the applicable laws,
legislation, regulations or court orders;<br /><br />
n. To comply with or as required by any reque or direction of any
governmental/law enforcement authorities; or responding To requests for
information from public agencies, ministries, statuTory bodies or other similar
authorities; <br /><br />
o. To detect, investigate and prevent any fraudulent, prohibited or illegal activities
or misuse of the Platform; <br /><br />
p. To transfer or assign our rights, interests and obligations under any agreements
entered into with us; <br /><br />
q. For internal administrative and updating purposes, such as auditing, data
analysis, record keeping, contact lists, risk management, security, etc.; and/or
r. For our storage, hosting back-up (whether for disaster recovery or otherwise) of
your personal data, whether within or outside your country, and you agree and
consent to us using and processing your personal data for the Purposes stated in
Paragraph 3 of this Privacy Policy. <br /><br />
ii.
Where you are our Art Actually Service Provider, business/marketing partner, agent,
vendor, distributor, supplier, contractor or service provider: <br /><br />
a. to engage you to provide art piece and/or music and /or products and/or
services to our Art Actually members; <br /><br />
b. to process any payments related to your commercial transactions with us; <br /><br />
c. to communicate with you and to maintain and improve customer relationship; <br /><br />
d. to provide you with support and handle requests and complaints; <br /><br />
e. to conduct credit reference checks and establish your credit worthiness, <br /><br />
f. to carry out due diligence or other monitoring or screening activities (including
background checks) in accordance with legal or regulatory obligations or risk
management procedures that may be required by law or that may have been put in
place by us; <br /><br />
g. to protect and/or enforce our legal rights and interests, including defending any
claim; <br /><br />
h. to comply with, our legal and regulatory obligations under the applicable laws,
legislation, regulations or court orders; <br /><br />
i. to comply with or as required by any request or direction of any
governmental/law enforcement authorities; or responding to requests for
information from public agencies, ministries, statutory bodies or other similar
authorities; <br /><br />
j. to detect, investigate and prevent any fraudulent, prohibited or illegal activities or
omission or misconduct; <br /><br />
k. to transfer or assign our rights, interests and obligations under any agreements
entered into with us; <br /><br />
l. for internal administrative and updating purposes, such as auditing, data analysis,
record keeping, contact lists, risk management, security, etc.; and/or
m. for our storage, hosting back-up (whether for disaster recovery or otherwise) of
your personal data, whether within or outside your country, and you agree and
consent to us using and processing your personal data for the Purposes stated in
Paragraph 3 of this Privacy Policy. <br /><br />
4.
MARKETING AND PROMOTIONAL PURPOSES <br /><br />
i.
We may also use and process your personal data for the following marketing and
promotional purposes (“Marketing and Promotional Purposes”):
a. To send you information, alerts, newsletters, updates, promotional materials,
special privileges announcements on products, services, upcoming contests, events,
activities, promotions, campaigns, polls or surveys offered/organized by us which
may be of interest To you; <br /><br />
b. To send you seasonal/festive greetings or messages; <br /><br />
c. To notify and invite you To events or activities organized by us which may be of
interest To you; <br /><br />
d. To process your registration To participate in or attend an event or activity and To
communicate with you regarding your attendance of the class registered; and/or <br /><br />
e. To share your personal data within our organization who may communicate with
you To market our products, services, events or promotions, from time to time by
SMS, phone call, email, fax, mail, social media and/or any other appropriate
communication channels. <br /><br />
ii.
You have the right at any time to request us to stop sending you any marketing and
promotional materials or contacting you for Marketing and Promotional Purposes.
You may also click on the “Unsubscribe” link embedded in the relevant marketing
and promotional email in order not to receive any marketing and promotional email
in the future. If you unsubscribe, we may still send you non-marketing and
promotional communications, such as those about your Account, about the Platform
or our ongoing business relations. <br /><br />
iii.
If you are an Art Actually member, your user profile information such as your
username will be used to identify you when you use the Platform. Your username
may be displayed to other users when you submit your rating and/or review. We will
not directly disclose or share your user email address and other information without
your consent. <br /><br />
iv.
For any update or unexpected changes to your profile and / or virtual exhibitions and
/or events, your contact information will be shared with the authorized Service
Provider for direct communications. We may also use, process and share
non-personally identifiable, aggregated, statistical and/or anonymous data within our
group for data analytics and to analyze and develop our marketing strategy and
further improve and enhance the Platform. <br /><br />
v.
We will seek your separate consent for any other purposes which do not fall within
the categories stated above. <br /><br />
5.
CONSEQUENCES OF NOT CONSENTING TO THIS PRIVACY POLICY/NOT PROVIDING
YOUR PERSONAL DATA <br /><br />
The collection of your personal data by us may be mandatory or voluntary in nature
depending on the Purposes for which your personal data is collected. Where it is
mandatory for you to provide us with your personal data, and you fail or choose not
to provide us with such data, or do not consent to the above or this Privacy Policy, we
will not be able to provide our Platform to you (if you are a Art Actually member) or
engage you to provide products and/or services to us or on our behalf or issue
payments to you for products and/or services provided (if you are our Art Actually
Service Provider, business/marketing partner, agent, vendor, distributor, supplier,
contractor or service provider). <br /><br />
6.
DISCLOSURE OF YOUR PERSONAL DATA <br /><br />
We will not sell, rent, transfer or disclose any of your personal data to any third party
without your consent. However, we may disclose some of your personal data to the
following third parties, for one or more of the above Purposes: <br /><br />
i.
our subsidiaries, related and/or associated companies; <br /><br />
ii.
your immediate family members and/or emergency contact person as may be
notified to us from time to time; <br /><br />
iii.
successors in title to us; <br /><br />
iv.
Our Service Providers for the events that you register on the Platform, as if you
register an event directly with the Art Actually’s Service Provider; <br /><br />
v.
any person under a duty of confidentiality to which has undertaken to keep your
personal data confidential which we have engaged to discharge our obligations to
you; <br /><br />
vi.
any party in relation to legal proceedings or prospective legal proceedings; <br /><br />
vii.
auditors, consultants, lawyers, accountants or other financial or professional advisers
appointed in connection with our business on a strictly confidential basis, appointed
by us to provide services to us; <br /><br />
viii.
any party nominated or appointed by us either solely or jointly with other service
providers, who provide services or conduct data processing on our behalf, or for data
centralization and/or logistics purposes; <br /><br />
ix.
data centers and/or servers located within or outside your country for data storage
purposes; <br /><br />
x.
storage facility and records management service providers; <br /><br />
xi.
government agencies, law enforcement agencies, courts, tribunals,
regulatory/professional bodies, industry regulators, ministries, and/or statutory
agencies or bodies, offices or municipality in any country, if required or authorized to
do so, to satisfy any applicable law, regulation, order or judgment of a court or
tribunal or queries from the relevant authorities; <br /><br />
xii.
credit reference/reporting agencies for the purpose of credit checking on you; <br /><br />
xiii.
insurance companies for the purpose of applying and obtaining insurance policy(ies), 
if necessary; <br /><br />
xiv.
financial institutions for the purpose of applying and obtaining credit facility(ies), if
necessary; <br /><br />
xv.
banks and/or financial institutions and credit/debit card companies in connection
with your commercial transactions with us; <br /><br />
xvi.
the general public when you become a winner in a contest, participate in our events
or activities, submit your rating and/or review or other features of the Platform that
are viewable by the general public without compensation for advertising and
publicity purposes; <br /><br />
xvii.
any third party (and its advisers/representatives) in connection with any proposed or
actual reorganization, merger, sale, consolidation, acquisition, joint venture,
assignment, transfer, funding exercise or asset/share sale relating to all or any
portion of our business or in the unlikely event of insolvency, bankruptcy or
receivership; and/or<br /><br />
xviii.
any other person reasonably requiring the same in order for us to operate and
maintain our business or carry out the activities set out in the Purposes or as
instructed/authorized by you. <br /><br />
7.
ACCURACY OF YOUR PERSONAL DATA <br /><br />
We take it that all personal data provided by you is accurate and complete, and that
none of it is misleading or out of date. You will promptly update us in the event of
any change to your personal data. Please note that your failure to maintain accurate,
complete and up-to-date personal data (including having an invalid or expired
payment method) may result in your inability to access and use the Platform and/or
termination of your membership. <br /><br />
8.
YOUR RIGHTS <br /><br />
i.
To the extent that the prevailing personal data protection and privacy laws of the
countries we operate in allow, you have the right to request for access to, request for
a copy of, request to update or correct, your personal data held by us. We may
charge a small fee (such amount as permitted under the applicable law) to cover the
administration costs involved in processing your request to access your personal
data. Notwithstanding the foregoing, we reserve our rights to rely on any statutory
exemptions and/or exceptions to collect, use and disclose your personal data. <br /><br />
ii.
In addition, you also have the right, by notice in writing, to inform us on your
withdrawal (in full or in part) of your consent given previously to us subject to any
applicable legal restrictions, contractual conditions and a reasonable duration of time
for the withdrawal of consent to be effected. ii.However, your withdrawal of consent
could result in certain legal consequences arising from such withdrawal. In this
regard, depending on the extent of your withdrawal of consent for us to process your
personal data, it may mean that we will not be able to continue with your existing
relationship with us or the contract that you have with us will have to be terminated. <br /><br />
iii.
You may correct, update or delete your personal data at any time by editing your
profile on the “Account Settings” page on the Platform. However, please note that
your personal data may be retained on our back-up systems for some time. In
addition, you cannot delete information associated with past transactions as we keep
track of these records.
By using our Platform, making an enquiry or making an application, you consent to
the collection and use of your information and other activities as outlined in this
Statement. <br /><br />
9.
RETENTION OF YOUR PERSONAL DATA <br /><br />
Any of your personal data provided to us is retained for as long as the purposes for
which the personal data was collected continues; your personal data is then
destroyed or anonymized from our records and back-up systems in accordance with
our retention policy in the event your personal data is no longer required for the said
purposes unless its further retention is required to satisfy a longer retention period
to meet our operational, legal, regulatory, tax or accounting requirements. <br /><br />
10.
SECURITY OF YOUR PERSONAL DATA <br /><br />
i.
We are committed to ensuring that your personal data is stored securely. In order to
prevent unauthorized access, disclosure or other similar risks, we endeavor, where
commercially practicable, to implement appropriate technical, physical, electronic
and procedural security measures in accordance with the applicable laws and
regulations and industry standard to safeguard against and prevent the unauthorized
or unlawful processing of your personal data, and the destruction of, or accidental
loss, damage to, alteration of, unauthorized disclosure of or access to your personal
data. <br /><br />
ii.
We will make reasonable updates to our security measures from time to time and
ensure the authorized third parties only use your personal data for the Purposes set
out in this Privacy Policy. <br /><br />
iii.
The Internet is not a secure medium. However, we will put in place various
reasonable security procedures with regard to the Platform and your electronic
communications with us. All our employees and data processors, who have access to,
and are associated with the processing of your personal data, are obliged to respect
the confidentiality of your personal data. <br /><br />
iv.
Unfortunately, no data transmission over the Internet or any wireless network can be
guaranteed to be 100% secure. While we take commercially practical steps to protect
your personal data, we cannot and do not accept responsibility for any unauthorized
access, unlawful interceptions or loss of personal data transmitted to or from Art
Actually, and are not responsible for the actions of any third parties that may receive
any such personal data. <br /><br />
11.
PERSONAL DATA FROM CHILDREN AND OTHER INDIVIDUALS <br /><br />
i.
To the extent that you have provided (or will provide) personal data about your
family members, spouse, other dependents (if you are an individual), directors,
shareholders, employees, representatives, agents (if you are a corporate, an entity or
an organization) and/or other individuals, you confirm that you have explained (or
will explain) to them that their personal data will be provided to, and processed by,
us and you represent and warrant that you have obtained their consent to the
processing (including disclosure and transfer) of their personal data in accordance
with this Privacy Policy. <br /><br />
ii.
In respect of children (i.e. individuals under the age of 18 or under the age of
majority in your country) or individuals not legally competent to give consent, you
confirm that you are the parent or legal guardian or person who has parental
responsibility over them or the person appointed by court to manage their affairs or
that they have appointed you to act for them, to consent on their behalf to the
processing (including disclosure and transfer) of their personal data in accordance
with this Privacy Policy. <br /><br />
12.
TRANSFER OF YOUR PERSONAL DATA OUTSIDE OF YOUR COUNTRY
Our information technology storage facilities and servers may be located in other
countries outside Canada. This may include, but not limited to, instances where your
personal data may be stored on servers located outside of your country. In addition,
your personal data may be disclosed or transferred to entities located outside
Canada. Please note that these foreign entities may be established in countries that
might not offer a level of data protection that is equivalent to that offered in Canada.
You hereby expressly consent to us transferring your personal data outside of your
country for such purpose. <br /><br />
13.
INTERNET AND MOBILE APPLICATION USE <br /><br />
i.
You acknowledge that the provision of your personal data to us over the Internet is
entirely at your own risk.<br /><br />
ii.
You further acknowledge that if you post your rating and/or review on the Platform,
your rating and/or review will become public information and will be retained by us
even after your membership has been terminated. Your email address and phone
number will not be visible to others through any rating and/or review that you post. <br /><br />
iii.
If any part of the Platform links you to other websites, those websites do not operate
under this Privacy Policy and we do not accept any responsibility or liability arising
from those websites. We suggest you to read and understand those websites’ privacy
policy before you provide your personal data to those websites. <br /><br />
iv.
We use cookies (an alphanumeric identifier that we transfer to your computer’s or
mobile device’s hard drive so that we can recognize your web browser or mobile
device, track your visits to the Platform or remember your username and/or
password each time log-in) to monitor your use of the Platform. All such
demographic data collected through cookies are not personal data and we may use
this data in aggregated, statistical and/or anonymized form. You may disable cookies
by changing the settings on your web browser or mobile device, although this may
mean that certain features on the Platform will not function properly if you set your
web browser or mobile device to not accept cookies. <br /><br />
v.
Please note that when you first install our mobile application on your mobile device,
we will set up an account associated with that mobile device (“Account”). We will
collect and use your personal data, in accordance with this Privacy Policy, whenever
you activate our mobile application on that mobile device. This use includes linking
your personal data with your Account. Most mobile platforms (iOS, Android, etc.)
have different permission systems for obtaining your consent. The iOS platform will
alert you the first time our mobile application wants permission to access certain
types of data and will let you consent (or not consent) to that request. Android
devices will notify you of the permissions that our mobile application seeks before
you first use the mobile application, and your use constitutes your consent. <br /><br />
vi.
The Platform may integrate with social sharing features and other related tools which
allow you to share information with your friends or the public, depending on the
settings you establish with the social sharing network. The social sharing network’s
use of your personal data made available by Art Actually is governed by that social
sharing network’s privacy policy, not by this Privacy Policy. By connecting your social
sharing network account through the Platform, you agree that we may collect your
personal data from your social sharing network account only in accordance with your
privacy settings you have set up under your social sharing network account and for
the Purposes provided under this Privacy Policy. <br /><br />
vii.
We may automatically receive record and store location services information from
your computer or mobile device when you interact with us. You hereby consent to
our use of anonymized location services information collected from you. Where the
location services information is personally identifiable, we will give you the options
to manage your disclosure of this information. Depending on the functionalities
available on your computer or mobile device, you may benefit from advanced
options to manage the location services information. A computer or mobile device
may report its GPS location at the time you interact with us if the location services
settings are enabled. Such information is not identified as personal data, except
where we are required to do otherwise under applicable law. <br /><br />
viii.
Our collection of your computer or mobile device location information is solely at
your discretion. You can enable or disable location services when you use the
Platform at any time, through your computer or mobile device settings. viii.Should
you use the Platform with location services enabled, you consent to our collection
and dissemination of your computer or mobile device location information through
the Platform, as specified in this Privacy Policy. Under no circumstances shall we be
liable for claims or for any damages therefrom, arising out of your informed decision
to allow other users to see your computer or mobile device location information, as
specified in this Privacy Policy. <br /><br />
14.
CONTACT DETAILS <br /><br />
If you have any questions about this Privacy Policy, or have any further queries, or
would like to make a complaint or data access or correction request in respect of
your personal data, you may contact us at  <b>info@artactually.net</b> <br /><br />
15.
ENGLISH VERSION TO PREVAIL <br /><br />
In the event of any inconsistencies or discrepancies between the English version and
other translated versions of this Privacy Policy, the English version shall prevail.
<br /><br />
              <span style={{ color: 'blue', fontWeight: 'bold' }}> <a href="#ReadMore" onClick={toggleFullText}>Read More</a></span>
            </>
          ) : (
            <span style={{ color: 'blue', fontWeight: 'bold' }}> <a href="#ReadMore" onClick={toggleFullText}>Read More</a></span>
          )}
        </p>

   </div>
    </>
  )
}

export default PrivacyPolicy