# QA Contact Report

Generated: 2026-07-26T11:10:40.981Z
Status: PASS

## Summary

- baseUrl: http://127.0.0.1:3000
- baseUrlWasExplicit: true
- scenarioCount: 13
- productionSubmit: No submit is performed by qa:contact.
- checks: 204
- pass: 204
- warn: 0
- fail: 0

## Policy

- This script never submits a lead.
- Query parameters are checked only for service/city/intent/source propagation.
- Browser-only validation remains manual unless a browser test runner is added later.

## Results

| Status | Priority | Scope | Path | Detail | Action |
| --- | --- | --- | --- | --- | --- |
| PASS | P0 | contact-route | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | HTTP 200. | No action. |
| PASS | P0 | contact-form | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | Lead/contact form found. | No action. |
| PASS | P0 | contact-fields | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | Name field check. | Add/restore name input. |
| PASS | P0 | contact-fields | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | Contact method/email/phone field check. | Add at least one contact method field. |
| PASS | P0 | contact-fields | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | Service field/value check. | Preserve service field or hidden service value. |
| PASS | P0 | contact-fields | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | City/location field check. | Preserve city/location field. |
| PASS | P0 | contact-fields | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | Message/scope field check. | Preserve message/scope field. |
| PASS | P0 | contact-fields | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | Privacy notice/consent check. | Add Datenschutz/consent text and field. |
| PASS | P0 | contact-fields | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | Submit button check. | Add visible submit button. |
| PASS | P0 | contact-params | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | Expected service rendered: angebot-pruefen or angebot_pruefen | Verify query personalization if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | Expected intent angebot-pruefen rendered. | Verify intent propagation if this check warns. |
| PASS | P1 | contact-seo | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | No noindex marker on contact scenario. | Confirm contact noindex policy if present. |
| PASS | P0 | contact-pii | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | No PII-like query keys in contact URL. | No action. |
| PASS | P0 | contact-pii | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | No PII-like data attributes on form. | No action. |
| PASS | P0 | contact-copy | /kontakt?service=angebot-pruefen&intent=angebot-pruefen&source=seo | No false booking/success guarantee copy in HTML. | No action. |
| PASS | P0 | contact-route | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | HTTP 200. | No action. |
| PASS | P0 | contact-form | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | Lead/contact form found. | No action. |
| PASS | P0 | contact-fields | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | Name field check. | Add/restore name input. |
| PASS | P0 | contact-fields | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | Contact method/email/phone field check. | Add at least one contact method field. |
| PASS | P0 | contact-fields | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | Service field/value check. | Preserve service field or hidden service value. |
| PASS | P0 | contact-fields | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | City/location field check. | Preserve city/location field. |
| PASS | P0 | contact-fields | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | Message/scope field check. | Preserve message/scope field. |
| PASS | P0 | contact-fields | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | Privacy notice/consent check. | Add Datenschutz/consent text and field. |
| PASS | P0 | contact-fields | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | Submit button check. | Add visible submit button. |
| PASS | P0 | contact-params | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | Expected service rendered: reinigung | Verify query personalization if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | City is applied by the verified client-side query personalization. | Verify city propagation if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | Intent is applied by the verified client-side query personalization. | Verify intent propagation if this check warns. |
| PASS | P1 | contact-seo | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | No noindex marker on contact scenario. | Confirm contact noindex policy if present. |
| PASS | P0 | contact-pii | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | No PII-like query keys in contact URL. | No action. |
| PASS | P0 | contact-pii | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | No PII-like data attributes on form. | No action. |
| PASS | P0 | contact-copy | /kontakt?service=reinigung&city=duesseldorf&intent=reinigung-duesseldorf&source=seo | No false booking/success guarantee copy in HTML. | No action. |
| PASS | P0 | contact-route | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | HTTP 200. | No action. |
| PASS | P0 | contact-form | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | Lead/contact form found. | No action. |
| PASS | P0 | contact-fields | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | Name field check. | Add/restore name input. |
| PASS | P0 | contact-fields | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | Contact method/email/phone field check. | Add at least one contact method field. |
| PASS | P0 | contact-fields | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | Service field/value check. | Preserve service field or hidden service value. |
| PASS | P0 | contact-fields | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | City/location field check. | Preserve city/location field. |
| PASS | P0 | contact-fields | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | Message/scope field check. | Preserve message/scope field. |
| PASS | P0 | contact-fields | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | Privacy notice/consent check. | Add Datenschutz/consent text and field. |
| PASS | P0 | contact-fields | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | Submit button check. | Add visible submit button. |
| PASS | P0 | contact-params | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | Expected service rendered: bueroreinigung or b2b_reinigung | Verify query personalization if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | City is applied by the verified client-side query personalization. | Verify city propagation if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | Intent is applied by the verified client-side query personalization. | Verify intent propagation if this check warns. |
| PASS | P1 | contact-seo | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | No noindex marker on contact scenario. | Confirm contact noindex policy if present. |
| PASS | P0 | contact-pii | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | No PII-like query keys in contact URL. | No action. |
| PASS | P0 | contact-pii | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | No PII-like data attributes on form. | No action. |
| PASS | P0 | contact-copy | /kontakt?service=bueroreinigung&city=duesseldorf&intent=bueroreinigung-duesseldorf&source=seo | No false booking/success guarantee copy in HTML. | No action. |
| PASS | P0 | contact-route | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | HTTP 200. | No action. |
| PASS | P0 | contact-form | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | Lead/contact form found. | No action. |
| PASS | P0 | contact-fields | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | Name field check. | Add/restore name input. |
| PASS | P0 | contact-fields | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | Contact method/email/phone field check. | Add at least one contact method field. |
| PASS | P0 | contact-fields | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | Service field/value check. | Preserve service field or hidden service value. |
| PASS | P0 | contact-fields | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | City/location field check. | Preserve city/location field. |
| PASS | P0 | contact-fields | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | Message/scope field check. | Preserve message/scope field. |
| PASS | P0 | contact-fields | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | Privacy notice/consent check. | Add Datenschutz/consent text and field. |
| PASS | P0 | contact-fields | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | Submit button check. | Add visible submit button. |
| PASS | P0 | contact-params | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | Expected service rendered: gewerbereinigung or b2b_reinigung | Verify query personalization if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | City is applied by the verified client-side query personalization. | Verify city propagation if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | Intent is applied by the verified client-side query personalization. | Verify intent propagation if this check warns. |
| PASS | P1 | contact-seo | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | No noindex marker on contact scenario. | Confirm contact noindex policy if present. |
| PASS | P0 | contact-pii | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | No PII-like query keys in contact URL. | No action. |
| PASS | P0 | contact-pii | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | No PII-like data attributes on form. | No action. |
| PASS | P0 | contact-copy | /kontakt?service=gewerbereinigung&city=duesseldorf&intent=gewerbereinigung-duesseldorf&source=seo | No false booking/success guarantee copy in HTML. | No action. |
| PASS | P0 | contact-route | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | HTTP 200. | No action. |
| PASS | P0 | contact-form | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | Lead/contact form found. | No action. |
| PASS | P0 | contact-fields | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | Name field check. | Add/restore name input. |
| PASS | P0 | contact-fields | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | Contact method/email/phone field check. | Add at least one contact method field. |
| PASS | P0 | contact-fields | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | Service field/value check. | Preserve service field or hidden service value. |
| PASS | P0 | contact-fields | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | City/location field check. | Preserve city/location field. |
| PASS | P0 | contact-fields | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | Message/scope field check. | Preserve message/scope field. |
| PASS | P0 | contact-fields | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | Privacy notice/consent check. | Add Datenschutz/consent text and field. |
| PASS | P0 | contact-fields | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | Submit button check. | Add visible submit button. |
| PASS | P0 | contact-params | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | Expected service rendered: umzug | Verify query personalization if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | Expected city rendered: regensburg | Verify city propagation if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | Intent is applied by the verified client-side query personalization. | Verify intent propagation if this check warns. |
| PASS | P1 | contact-seo | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | No noindex marker on contact scenario. | Confirm contact noindex policy if present. |
| PASS | P0 | contact-pii | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | No PII-like query keys in contact URL. | No action. |
| PASS | P0 | contact-pii | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | No PII-like data attributes on form. | No action. |
| PASS | P0 | contact-copy | /kontakt?service=umzug&city=regensburg&intent=umzug-regensburg&source=seo | No false booking/success guarantee copy in HTML. | No action. |
| PASS | P0 | contact-route | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | HTTP 200. | No action. |
| PASS | P0 | contact-form | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | Lead/contact form found. | No action. |
| PASS | P0 | contact-fields | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | Name field check. | Add/restore name input. |
| PASS | P0 | contact-fields | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | Contact method/email/phone field check. | Add at least one contact method field. |
| PASS | P0 | contact-fields | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | Service field/value check. | Preserve service field or hidden service value. |
| PASS | P0 | contact-fields | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | City/location field check. | Preserve city/location field. |
| PASS | P0 | contact-fields | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | Message/scope field check. | Preserve message/scope field. |
| PASS | P0 | contact-fields | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | Privacy notice/consent check. | Add Datenschutz/consent text and field. |
| PASS | P0 | contact-fields | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | Submit button check. | Add visible submit button. |
| PASS | P0 | contact-params | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | Expected service rendered: entruempelung or entsorgung | Verify query personalization if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | Expected city rendered: regensburg | Verify city propagation if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | Intent is applied by the verified client-side query personalization. | Verify intent propagation if this check warns. |
| PASS | P1 | contact-seo | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | No noindex marker on contact scenario. | Confirm contact noindex policy if present. |
| PASS | P0 | contact-pii | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | No PII-like query keys in contact URL. | No action. |
| PASS | P0 | contact-pii | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | No PII-like data attributes on form. | No action. |
| PASS | P0 | contact-copy | /kontakt?service=entruempelung&city=regensburg&intent=entruempelung-regensburg&source=seo | No false booking/success guarantee copy in HTML. | No action. |
| PASS | P0 | contact-route | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | HTTP 200. | No action. |
| PASS | P0 | contact-form | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | Lead/contact form found. | No action. |
| PASS | P0 | contact-fields | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | Name field check. | Add/restore name input. |
| PASS | P0 | contact-fields | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | Contact method/email/phone field check. | Add at least one contact method field. |
| PASS | P0 | contact-fields | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | Service field/value check. | Preserve service field or hidden service value. |
| PASS | P0 | contact-fields | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | City/location field check. | Preserve city/location field. |
| PASS | P0 | contact-fields | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | Message/scope field check. | Preserve message/scope field. |
| PASS | P0 | contact-fields | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | Privacy notice/consent check. | Add Datenschutz/consent text and field. |
| PASS | P0 | contact-fields | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | Submit button check. | Add visible submit button. |
| PASS | P0 | contact-params | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | Expected service rendered: klaviertransport | Verify query personalization if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | Expected city rendered: regensburg | Verify city propagation if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | Intent is applied by the verified client-side query personalization. | Verify intent propagation if this check warns. |
| PASS | P1 | contact-seo | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | No noindex marker on contact scenario. | Confirm contact noindex policy if present. |
| PASS | P0 | contact-pii | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | No PII-like query keys in contact URL. | No action. |
| PASS | P0 | contact-pii | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | No PII-like data attributes on form. | No action. |
| PASS | P0 | contact-copy | /kontakt?service=klaviertransport&city=regensburg&intent=klaviertransport-regensburg&source=seo | No false booking/success guarantee copy in HTML. | No action. |
| PASS | P0 | contact-route | /kontakt?service=diskret-service&intent=diskret-service&source=seo | HTTP 200. | No action. |
| PASS | P0 | contact-form | /kontakt?service=diskret-service&intent=diskret-service&source=seo | Lead/contact form found. | No action. |
| PASS | P0 | contact-fields | /kontakt?service=diskret-service&intent=diskret-service&source=seo | Name field check. | Add/restore name input. |
| PASS | P0 | contact-fields | /kontakt?service=diskret-service&intent=diskret-service&source=seo | Contact method/email/phone field check. | Add at least one contact method field. |
| PASS | P0 | contact-fields | /kontakt?service=diskret-service&intent=diskret-service&source=seo | Service field/value check. | Preserve service field or hidden service value. |
| PASS | P0 | contact-fields | /kontakt?service=diskret-service&intent=diskret-service&source=seo | City/location field check. | Preserve city/location field. |
| PASS | P0 | contact-fields | /kontakt?service=diskret-service&intent=diskret-service&source=seo | Message/scope field check. | Preserve message/scope field. |
| PASS | P0 | contact-fields | /kontakt?service=diskret-service&intent=diskret-service&source=seo | Privacy notice/consent check. | Add Datenschutz/consent text and field. |
| PASS | P0 | contact-fields | /kontakt?service=diskret-service&intent=diskret-service&source=seo | Submit button check. | Add visible submit button. |
| PASS | P0 | contact-params | /kontakt?service=diskret-service&intent=diskret-service&source=seo | Expected service rendered: diskret-service or private-client or private_client | Verify query personalization if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=diskret-service&intent=diskret-service&source=seo | Expected intent diskret-service rendered. | Verify intent propagation if this check warns. |
| PASS | P1 | contact-seo | /kontakt?service=diskret-service&intent=diskret-service&source=seo | No noindex marker on contact scenario. | Confirm contact noindex policy if present. |
| PASS | P0 | contact-pii | /kontakt?service=diskret-service&intent=diskret-service&source=seo | No PII-like query keys in contact URL. | No action. |
| PASS | P0 | contact-pii | /kontakt?service=diskret-service&intent=diskret-service&source=seo | No PII-like data attributes on form. | No action. |
| PASS | P0 | contact-copy | /kontakt?service=diskret-service&intent=diskret-service&source=seo | No false booking/success guarantee copy in HTML. | No action. |
| PASS | P0 | contact-route | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | HTTP 200. | No action. |
| PASS | P0 | contact-form | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | Lead/contact form found. | No action. |
| PASS | P0 | contact-fields | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | Name field check. | Add/restore name input. |
| PASS | P0 | contact-fields | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | Contact method/email/phone field check. | Add at least one contact method field. |
| PASS | P0 | contact-fields | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | Service field/value check. | Preserve service field or hidden service value. |
| PASS | P0 | contact-fields | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | City/location field check. | Preserve city/location field. |
| PASS | P0 | contact-fields | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | Message/scope field check. | Preserve message/scope field. |
| PASS | P0 | contact-fields | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | Privacy notice/consent check. | Add Datenschutz/consent text and field. |
| PASS | P0 | contact-fields | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | Submit button check. | Add visible submit button. |
| PASS | P0 | contact-params | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | Expected service rendered: seniorenumzug | Verify query personalization if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | Intent is applied by the verified client-side query personalization. | Verify intent propagation if this check warns. |
| PASS | P1 | contact-seo | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | No noindex marker on contact scenario. | Confirm contact noindex policy if present. |
| PASS | P0 | contact-pii | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | No PII-like query keys in contact URL. | No action. |
| PASS | P0 | contact-pii | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | No PII-like data attributes on form. | No action. |
| PASS | P0 | contact-copy | /kontakt?service=seniorenumzug&intent=seniorenumzug-anfragen&source=seo | No false booking/success guarantee copy in HTML. | No action. |
| PASS | P0 | contact-route | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | HTTP 200. | No action. |
| PASS | P0 | contact-form | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | Lead/contact form found. | No action. |
| PASS | P0 | contact-fields | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | Name field check. | Add/restore name input. |
| PASS | P0 | contact-fields | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | Contact method/email/phone field check. | Add at least one contact method field. |
| PASS | P0 | contact-fields | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | Service field/value check. | Preserve service field or hidden service value. |
| PASS | P0 | contact-fields | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | City/location field check. | Preserve city/location field. |
| PASS | P0 | contact-fields | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | Message/scope field check. | Preserve message/scope field. |
| PASS | P0 | contact-fields | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | Privacy notice/consent check. | Add Datenschutz/consent text and field. |
| PASS | P0 | contact-fields | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | Submit button check. | Add visible submit button. |
| PASS | P0 | contact-params | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | Expected service rendered: solarreinigung | Verify query personalization if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | Intent is applied by the verified client-side query personalization. | Verify intent propagation if this check warns. |
| PASS | P1 | contact-seo | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | No noindex marker on contact scenario. | Confirm contact noindex policy if present. |
| PASS | P0 | contact-pii | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | No PII-like query keys in contact URL. | No action. |
| PASS | P0 | contact-pii | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | No PII-like data attributes on form. | No action. |
| PASS | P0 | contact-copy | /kontakt?service=solarreinigung&intent=solarreinigung-anfragen&source=seo | No false booking/success guarantee copy in HTML. | No action. |
| PASS | P0 | contact-route | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | HTTP 200. | No action. |
| PASS | P0 | contact-form | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | Lead/contact form found. | No action. |
| PASS | P0 | contact-fields | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | Name field check. | Add/restore name input. |
| PASS | P0 | contact-fields | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | Contact method/email/phone field check. | Add at least one contact method field. |
| PASS | P0 | contact-fields | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | Service field/value check. | Preserve service field or hidden service value. |
| PASS | P0 | contact-fields | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | City/location field check. | Preserve city/location field. |
| PASS | P0 | contact-fields | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | Message/scope field check. | Preserve message/scope field. |
| PASS | P0 | contact-fields | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | Privacy notice/consent check. | Add Datenschutz/consent text and field. |
| PASS | P0 | contact-fields | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | Submit button check. | Add visible submit button. |
| PASS | P0 | contact-params | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | Expected service rendered: cleaning or reinigung | Verify query personalization if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | City is applied by the verified client-side query personalization. | Verify city propagation if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | Intent is applied by the verified client-side query personalization. | Verify intent propagation if this check warns. |
| PASS | P1 | contact-seo | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | No noindex marker on contact scenario. | Confirm contact noindex policy if present. |
| PASS | P0 | contact-pii | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | No PII-like query keys in contact URL. | No action. |
| PASS | P0 | contact-pii | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | No PII-like data attributes on form. | No action. |
| PASS | P0 | contact-copy | /kontakt?service=cleaning&city=duesseldorf&intent=english-cleaning-duesseldorf&source=seo | No false booking/success guarantee copy in HTML. | No action. |
| PASS | P0 | contact-route | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | HTTP 200. | No action. |
| PASS | P0 | contact-form | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | Lead/contact form found. | No action. |
| PASS | P0 | contact-fields | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | Name field check. | Add/restore name input. |
| PASS | P0 | contact-fields | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | Contact method/email/phone field check. | Add at least one contact method field. |
| PASS | P0 | contact-fields | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | Service field/value check. | Preserve service field or hidden service value. |
| PASS | P0 | contact-fields | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | City/location field check. | Preserve city/location field. |
| PASS | P0 | contact-fields | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | Message/scope field check. | Preserve message/scope field. |
| PASS | P0 | contact-fields | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | Privacy notice/consent check. | Add Datenschutz/consent text and field. |
| PASS | P0 | contact-fields | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | Submit button check. | Add visible submit button. |
| PASS | P0 | contact-params | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | Expected service rendered: moving or umzug | Verify query personalization if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | Expected city rendered: regensburg | Verify city propagation if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | Intent is applied by the verified client-side query personalization. | Verify intent propagation if this check warns. |
| PASS | P1 | contact-seo | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | No noindex marker on contact scenario. | Confirm contact noindex policy if present. |
| PASS | P0 | contact-pii | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | No PII-like query keys in contact URL. | No action. |
| PASS | P0 | contact-pii | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | No PII-like data attributes on form. | No action. |
| PASS | P0 | contact-copy | /kontakt?service=moving&city=regensburg&intent=english-moving-regensburg&source=seo | No false booking/success guarantee copy in HTML. | No action. |
| PASS | P0 | contact-route | /kontakt?service=offer-check&intent=english-offer-check&source=seo | HTTP 200. | No action. |
| PASS | P0 | contact-form | /kontakt?service=offer-check&intent=english-offer-check&source=seo | Lead/contact form found. | No action. |
| PASS | P0 | contact-fields | /kontakt?service=offer-check&intent=english-offer-check&source=seo | Name field check. | Add/restore name input. |
| PASS | P0 | contact-fields | /kontakt?service=offer-check&intent=english-offer-check&source=seo | Contact method/email/phone field check. | Add at least one contact method field. |
| PASS | P0 | contact-fields | /kontakt?service=offer-check&intent=english-offer-check&source=seo | Service field/value check. | Preserve service field or hidden service value. |
| PASS | P0 | contact-fields | /kontakt?service=offer-check&intent=english-offer-check&source=seo | City/location field check. | Preserve city/location field. |
| PASS | P0 | contact-fields | /kontakt?service=offer-check&intent=english-offer-check&source=seo | Message/scope field check. | Preserve message/scope field. |
| PASS | P0 | contact-fields | /kontakt?service=offer-check&intent=english-offer-check&source=seo | Privacy notice/consent check. | Add Datenschutz/consent text and field. |
| PASS | P0 | contact-fields | /kontakt?service=offer-check&intent=english-offer-check&source=seo | Submit button check. | Add visible submit button. |
| PASS | P0 | contact-params | /kontakt?service=offer-check&intent=english-offer-check&source=seo | Expected service rendered: offer-check or angebot-pruefen or angebot_pruefen | Verify query personalization if this check warns. |
| PASS | P0 | contact-params | /kontakt?service=offer-check&intent=english-offer-check&source=seo | Intent is applied by the verified client-side query personalization. | Verify intent propagation if this check warns. |
| PASS | P1 | contact-seo | /kontakt?service=offer-check&intent=english-offer-check&source=seo | No noindex marker on contact scenario. | Confirm contact noindex policy if present. |
| PASS | P0 | contact-pii | /kontakt?service=offer-check&intent=english-offer-check&source=seo | No PII-like query keys in contact URL. | No action. |
| PASS | P0 | contact-pii | /kontakt?service=offer-check&intent=english-offer-check&source=seo | No PII-like data attributes on form. | No action. |
| PASS | P0 | contact-copy | /kontakt?service=offer-check&intent=english-offer-check&source=seo | No false booking/success guarantee copy in HTML. | No action. |
| PASS | P2 | browser-interaction | contact-scenarios | No Playwright/Cypress dependency configured; HTTP/SSR form regression ran without adding a browser dependency. | Optional manual browser check remains required before production. |
