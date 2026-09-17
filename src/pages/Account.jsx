import { useAuth } from "../context/AuthContext";

function Account() {
  const { user } = useAuth();
  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <main className="page-content">
      <section className="account-header">
        <p className="eyebrow">Your account</p>
        <h2>Welcome back, {user.firstName}.</h2>
        <p>Your profile, saved cart, and shopping activity are connected to this account.</p>
      </section>

      <section className="account-grid">
        <article className="account-card">
          <div className="profile-avatar">{initials}</div>
          <p className="eyebrow">Profile</p>
          <h3>{fullName}</h3>
          <p>{user.email}</p>
        </article>

        <article className="account-card">
          <p className="eyebrow">Recent activity</p>
          <h3>{user.activities?.length ?? 0} recorded activities</h3>
          <div className="activity-list">
            {(user.activities ?? []).slice(0, 6).map((activity) => (
              <p key={activity.id}>
                <strong>{activity.message}</strong>
                <small>{new Date(activity.date).toLocaleString()}</small>
              </p>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

export default Account;
