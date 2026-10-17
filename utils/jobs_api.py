
import requests


def fetch_jobs(search="python", limit=5):
    url = "https://remotive.com/api/remote-jobs"

    response = requests.get(
        url,
        params={"search": search, "limit": limit},
        timeout=20,
    )
    response.raise_for_status()

    data = response.json()
    jobs = []

    for job in data.get("jobs", []):
        jobs.append({
            "id": str(job["id"]),
            "title": job.get("title"),
            "company": job.get("company_name"),
            "location": job.get("candidate_required_location"),
            # "description": job.get("description"),
            "url": job.get("url"),
            "published_at": job.get("publication_date"),
            "source": "Remotive",
        })

    return jobs
