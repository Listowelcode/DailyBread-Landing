"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  enrollSubscriberPortalJourney,
  getSubscriberPortalOverview,
  updateSubscriberPortalPreferences,
} from "@/lib/api";
import type {
  SubscriberPortalDeliveryItem,
  SubscriberPortalJourneyCard,
  SubscriberPortalOverview,
  SubscriberPortalPreferencesUpdate,
} from "@/lib/types";
import { getGreeting } from "@/lib/timezones";

const TOKEN_KEY = "dailybread_subscriber_magic_token";

function formatDate(value: string | null, withTime = false) {
  if (!value) return "Not scheduled";
  const date = new Date(value);
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
  }).format(date);
}

function deliveryLabel(type: string) {
  return type.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function SubscriberPortal() {
  const [token, setToken] = useState<string | null>(null);
  const [overview, setOverview] = useState<SubscriberPortalOverview | null>(null);
  const [selectedJourney, setSelectedJourney] = useState<SubscriberPortalJourneyCard | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<SubscriberPortalDeliveryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [enrolling, setEnrolling] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadOverview = useCallback(async (activeToken: string) => {
    setError("");
    try {
      const nextOverview = await getSubscriberPortalOverview(activeToken);
      setOverview(nextOverview);
    } catch (requestError) {
      const detail = requestError instanceof Error ? requestError.message : "This profile link is no longer available.";
      setError(detail);
      if ("status" in (requestError as object) && (requestError as { status?: number }).status === 401) {
        window.localStorage.removeItem(TOKEN_KEY);
        window.location.assign("/auth/verify");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const activeToken = window.localStorage.getItem(TOKEN_KEY);
    if (!activeToken) {
      window.location.assign("/auth/verify");
      return;
    }
    setToken(activeToken);
    void loadOverview(activeToken);
  }, [loadOverview]);

  const updatePreferences = async (input: SubscriberPortalPreferencesUpdate) => {
    if (!token) return;
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const updated = await updateSubscriberPortalPreferences(token, input);
      setOverview(updated);
      setMessage("Your Daily Bread preferences are saved.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Preferences could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  const enroll = async (journey: SubscriberPortalJourneyCard) => {
    if (!token || journey.enrolled) return;
    setEnrolling(journey.id);
    setMessage("");
    setError("");
    try {
      await enrollSubscriberPortalJourney(token, journey.id);
      const updated = await getSubscriberPortalOverview(token);
      setOverview(updated);
      setSelectedJourney(updated.journeys.find((item) => item.id === journey.id) ?? null);
      setMessage(`You are now walking through ${journey.title}.`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "This journey could not be joined.");
    } finally {
      setEnrolling(null);
    }
  };

  const firstName = useMemo(() => overview?.full_name.split(" ")[0] ?? "friend", [overview]);

  // Recompute the greeting on a timer so it flips from "Good morning" to
  // "Good afternoon"/"Good evening" while the profile stays open, always
  // read against the subscriber's own timezone (not the visitor's).
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);
  const subscriberTimezone = overview?.preferences.timezone || overview?.timezone;

  const salutation = useMemo(() => {
    if (!overview) return "";
    const greeting = getGreeting(subscriberTimezone, now);
    return `${greeting}, ${firstName}`;
  }, [overview, subscriberTimezone, firstName, now]);

  // The backend's local_time snapshot is only accurate at the moment the
  // profile was fetched, so it drifts (and can disagree with the greeting
  // above) the longer the page stays open. Compute it live instead, off the
  // same ticking clock and the same timezone the greeting uses.
  const localTimeLabel = useMemo(() => {
    if (!overview) return "";
    if (!subscriberTimezone) return overview.local_time;
    try {
      return new Intl.DateTimeFormat("en-US", {
        timeZone: subscriberTimezone,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(now);
    } catch {
      return overview.local_time;
    }
  }, [overview, subscriberTimezone, now]);

  if (loading) {
    return (
      <main className="portal-page portal-loading" aria-busy="true">
        <div className="portal-loading-mark"><img src="/dailybread-icon-transparent.png" alt="Daily Bread" /></div>
        <p className="eyebrow">Opening your Daily Bread</p>
        <div className="portal-loading-line" />
      </main>
    );
  }

  if (!overview) {
    return (
      <main className="portal-page portal-error-page">
        <div className="portal-error-card reveal is-visible">
          <p className="eyebrow">Profile link unavailable</p>
          <h1 className="font-display">Let’s find your place again.</h1>
          <p>{error || "This private link may have expired. Request a fresh link to continue."}</p>
          <a className="portal-primary-button" href="/auth/verify">Request a new link</a>
        </div>
      </main>
    );
  }

  const prefs = overview.preferences;

  return (
    <main className="portal-page">
      <div className="portal-orb portal-orb-one" />
      <div className="portal-orb portal-orb-two" />
      <div className="portal-shell">
        <header className="portal-header reveal is-visible">
          <a className="portal-brand" href="/" aria-label="Return to Daily Bread home">
            <img src="/dailybread-lockup.png" alt="Daily Bread" className="portal-brand-logo" />
          </a>
          <div className="portal-header-actions">
            <span className="portal-time"><span className="eyebrow">LOCAL TIME</span>{localTimeLabel}</span>
            <button className="portal-text-button" type="button" onClick={() => { window.localStorage.removeItem(TOKEN_KEY); window.location.assign("/"); }}>Leave profile</button>
          </div>
        </header>

        <section className="portal-welcome reveal is-visible reveal-delay-1">
          <div>
            <p className="eyebrow">Your Daily Bread space</p>
            <h1 className="font-display">{salutation}.</h1>
            <p className="portal-lede">A small place to shape how scripture, prayer, and reflection meet you each day.</p>
          </div>
          <div className="portal-welcome-note">
            <span className="portal-note-glyph">✦</span>
            <p>“Give us this day our daily bread.”</p>
            <small>Matthew 6:11</small>
          </div>
        </section>

        {(message || error) && (
          <div className={`portal-feedback ${error ? "is-error" : ""}`} role="status">{error || message}</div>
        )}

        <section className="portal-metrics reveal is-visible reveal-delay-2" aria-label="Your Daily Bread summary">
          <div className="portal-metric"><strong>{overview.total_emails_received}</strong><span>Emails received</span></div>
          <div className="portal-metric"><strong>{overview.total_journeys}</strong><span>Journeys joined</span></div>
          <div className="portal-metric"><strong>{overview.active_journeys}</strong><span>Active journeys</span></div>
          <div className="portal-metric"><strong>{formatDate(overview.joined_at)}</strong><span>Joined Daily Bread</span></div>
        </section>

        <div className="portal-grid">
          <section className="portal-card portal-preferences reveal is-visible reveal-delay-2">
            <div className="portal-section-heading"><div><p className="eyebrow">How we meet you</p><h2 className="font-display">Your preferences</h2></div><span className="portal-section-icon">◌</span></div>
            <div className="portal-setting-list">
              <label className="portal-toggle-row"><span><strong>Today’s Word</strong><small>Daily scripture, encouragement, and prayer</small></span><input type="checkbox" checked={prefs.todays_word_enabled} disabled={saving} onChange={(event) => void updatePreferences({ todays_word_enabled: event.target.checked })} /><i /></label>
              <label className="portal-toggle-row"><span><strong>Spiritual Journeys</strong><small>Walk through a guided multi-day rhythm</small></span><input type="checkbox" checked={prefs.spiritual_journey_enabled} disabled={saving} onChange={(event) => void updatePreferences({ spiritual_journey_enabled: event.target.checked })} /><i /></label>
            </div>
            <div className="portal-time-settings">
              <div className="portal-subheading"><span>Delivery rhythm</span><small>Times use {prefs.timezone}</small></div>
              <label className="portal-time-row"><span>Today’s Word</span><select className="portal-select" value={prefs.use_admin_word_time ? "admin" : "personal"} disabled={saving} onChange={(event) => void updatePreferences(event.target.value === "admin" ? { use_admin_word_time: true } : { use_admin_word_time: false, todays_word_time: prefs.todays_word_time ?? prefs.admin_todays_word_time })}><option value="admin">Daily Bread default · {prefs.admin_todays_word_time}</option><option value="personal">My preferred time</option></select>{!prefs.use_admin_word_time && <input type="time" value={prefs.todays_word_time ?? prefs.admin_todays_word_time} disabled={saving} onChange={(event) => void updatePreferences({ todays_word_time: event.target.value })} />}</label>
              <label className="portal-time-row"><span>Journey email</span><select className="portal-select" value={prefs.use_admin_journey_time ? "admin" : "personal"} disabled={saving} onChange={(event) => void updatePreferences(event.target.value === "admin" ? { use_admin_journey_time: true } : { use_admin_journey_time: false, spiritual_journey_time: prefs.spiritual_journey_time ?? prefs.admin_spiritual_journey_time })}><option value="admin">Daily Bread default · {prefs.admin_spiritual_journey_time}</option><option value="personal">My preferred time</option></select>{!prefs.use_admin_journey_time && <input type="time" value={prefs.spiritual_journey_time ?? prefs.admin_spiritual_journey_time} disabled={saving} onChange={(event) => void updatePreferences({ spiritual_journey_time: event.target.value })} />}</label>
            </div>
          </section>

          <section className="portal-card portal-account reveal is-visible reveal-delay-3">
            <div className="portal-section-heading"><div><p className="eyebrow">Your details</p><h2 className="font-display">Account</h2></div><span className="portal-section-icon">⌁</span></div>
            <div className="portal-account-detail"><span>Name</span><strong>{overview.full_name}</strong></div>
            <div className="portal-account-detail"><span>Email</span><strong>{overview.email}</strong></div>
            <div className="portal-account-detail"><span>Timezone</span><strong>{prefs.timezone || overview.timezone}</strong></div>
            <div className="portal-account-detail"><span>Member since</span><strong>{formatDate(overview.joined_at)}</strong></div>
            <p className="portal-account-note">Your profile is secured by a private magic link from Daily Bread. No password to remember.</p>
          </section>
        </div>

        <section className="portal-section reveal is-visible reveal-delay-2">
          <div className="portal-section-heading portal-heading-wide"><div><p className="eyebrow">A path for this season</p><h2 className="font-display">Published journeys</h2><p>Choose a pace that gives your attention somewhere gentle to land.</p></div><span className="portal-section-count">{overview.journeys.length} available</span></div>
          {overview.journeys.length === 0 ? <div className="portal-empty">New journeys are being prepared. Keep an eye on this space.</div> : <div className="portal-journey-grid">{overview.journeys.map((journey) => <button className="portal-journey-card" key={journey.id} type="button" onClick={() => setSelectedJourney(journey)}><span className="portal-journey-number">{journey.category || "SPIRITUAL JOURNEY"}</span><h3 className="font-display">{journey.title}</h3><p>{journey.description}</p><div className="portal-journey-meta"><span>{journey.duration_days} days</span><span>{journey.enrolled ? `${journey.current_day ? `Day ${journey.current_day} · ` : ""}${journey.enrollment_status}` : "Explore journey"}</span></div></button>)}</div>}
        </section>

        <section className="portal-card portal-activity reveal is-visible reveal-delay-3">
          <div className="portal-section-heading portal-heading-wide"><div><p className="eyebrow">Your rhythm with us</p><h2 className="font-display">Email activity</h2><p>Tap any message to see its delivery details.</p></div><span className="portal-section-count">{overview.total_emails_received} sent to you</span></div>
          {overview.recent_deliveries.length === 0 ? <div className="portal-empty">Your first Daily Bread message will appear here.</div> : <div className="portal-delivery-list">{overview.recent_deliveries.map((delivery) => <button className="portal-delivery-row" type="button" key={delivery.id} onClick={() => setSelectedDelivery(delivery)}><span className="portal-delivery-dot" /><span className="portal-delivery-copy"><strong>{delivery.subject}</strong><small>{deliveryLabel(delivery.delivery_type)} · {formatDate(delivery.sent_at || delivery.created_at, true)}</small></span><span className={`portal-status portal-status-${delivery.status}`}>{delivery.status}</span><span className="portal-arrow">↗</span></button>)}</div>}
        </section>

        <footer className="portal-footer"><span>DailyBread.</span><small>Make room for what gives life.</small><a href="/">Return to the public site</a></footer>
      </div>

      {selectedJourney && <div className="portal-modal-backdrop" role="presentation" onClick={() => setSelectedJourney(null)}><div className="portal-modal" role="dialog" aria-modal="true" aria-labelledby="journey-modal-title" onClick={(event) => event.stopPropagation()}><button className="portal-modal-close" type="button" aria-label="Close" onClick={() => setSelectedJourney(null)}>×</button><p className="eyebrow">{selectedJourney.category || "Spiritual journey"}</p><h2 id="journey-modal-title" className="font-display">{selectedJourney.title}</h2><p>{selectedJourney.description}</p><div className="portal-modal-facts"><span><strong>{selectedJourney.duration_days}</strong> days</span><span><strong>{selectedJourney.enrolled ? selectedJourney.current_day ?? 1 : "—"}</strong> current day</span><span><strong>{selectedJourney.enrolled ? "Joined" : "Open"}</strong> status</span></div>{selectedJourney.enrolled ? <p className="portal-modal-note">You are already enrolled. Your next journey email will follow the delivery rhythm above.</p> : <button className="portal-primary-button" disabled={enrolling === selectedJourney.id} onClick={() => void enroll(selectedJourney)}>{enrolling === selectedJourney.id ? "Joining…" : `Join ${firstName}'s journey`}</button>}</div></div>}
      {selectedDelivery && <div className="portal-modal-backdrop" role="presentation" onClick={() => setSelectedDelivery(null)}><div className="portal-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><button className="portal-modal-close" type="button" aria-label="Close" onClick={() => setSelectedDelivery(null)}>×</button><p className="eyebrow">Message detail</p><h2 className="font-display">{selectedDelivery.subject}</h2><div className="portal-modal-facts"><span><strong>{deliveryLabel(selectedDelivery.delivery_type)}</strong> type</span><span><strong>{selectedDelivery.status}</strong> status</span></div><p className="portal-modal-note">Sent {formatDate(selectedDelivery.sent_at || selectedDelivery.created_at, true)}. This message was addressed to {overview.email}.</p></div></div>}
    </main>
  );
}
